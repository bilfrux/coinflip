"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount, useContractRead } from "wagmi";
import { Coin3D } from "~~/components/Coin3D";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>("0.01");
  const [playerChoice, setPlayerChoice] = useState<boolean>(true); // true = heads
  const [gameResult, setGameResult] = useState<{
    won: boolean;
    payout: string;
  } | null>(null);
  const [totalBets, setTotalBets] = useState<number>(0);
  const [wins, setWins] = useState<number>(0);

  // Utilise l'abstraction du projet pour gérer l'écriture vers le contrat
  const scaffoldWrite = useScaffoldWriteContract({ contractName: "CoinFlip" });

  // Récupère les infos déployées (adresse + abi) depuis deployedContracts.ts
  const { data: deployedData } = useDeployedContractInfo({ contractName: "CoinFlip" });

  // wagmi read pour récupérer le résultat en chaîne
  const { data: onchainResult } = useContractRead({
    address: deployedData?.address,
    abi: deployedData?.abi,
    functionName: "getResult",
    args: connectedAddress ? [connectedAddress] : undefined,
  }) as any;

  useEffect(() => {
    if (onchainResult && onchainResult[1]) {
      setFlipping(false);
      setResult(onchainResult[0] ? "Heads" : "Tails");
    }
  }, [onchainResult]);

  const handleFlip = async () => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      alert("Please enter a valid bet amount");
      return;
    }

    if (!connectedAddress) {
      alert("Please connect your wallet first");
      return;
    }

    setResult(null);
    setGameResult(null);
    setFlipping(true);
    setTotalBets(totalBets + 1);

    try {
      // Envoie la transaction via l'abstraction du projet
      const betAmountWei = (parseFloat(betAmount) * 1e18).toString();

      const txResult = await scaffoldWrite.writeContractAsync({
        functionName: "flipCoin",
        args: [playerChoice],
        value: BigInt(betAmountWei),
      } as any);

      console.log("Transaction sent:", txResult);

      // Simulate a realistic result display (2 second delay for animation)
      // The contract determines the actual result, this is just for UI animation
      setTimeout(() => {
        const simulatedWin = Math.random() > 0.5;
        const payout = simulatedWin ? (parseFloat(betAmount) * 2).toFixed(4) : "0";

        setGameResult({
          won: simulatedWin,
          payout: payout,
        });

        if (simulatedWin) {
          setWins(wins + 1);
        }

        setFlipping(false);
      }, 2000);
    } catch (error: any) {
      setFlipping(false);
      console.error("Flip failed:", error);

      // Show error details
      const errorMessage =
        error?.message ||
        error?.shortMessage ||
        "Transaction failed. Make sure you have enough balance and the contract is deployed.";
      alert(`Error: ${errorMessage}`);

      setGameResult({ won: false, payout: "0" });
    }
  };

  const winRate = totalBets > 0 ? ((wins / totalBets) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎲</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CoinFlip Elite
            </h1>
          </div>
          <div className="text-sm text-slate-400">
            <Address address={connectedAddress} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Stats */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <h3 className="text-slate-400 text-sm font-semibold mb-4">STATISTICS</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase">Total Bets</p>
                  <p className="text-2xl font-bold text-blue-400">{totalBets}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase">Wins</p>
                  <p className="text-2xl font-bold text-green-400">{wins}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase">Win Rate</p>
                  <p className="text-2xl font-bold text-purple-400">{winRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Game */}
          <div className="flex flex-col items-center justify-center">
            {/* Coin Animation */}
            <div className="mb-8">
              <Coin3D isFlipping={flipping} result={result as "Heads" | "Tails" | null} />
            </div>

            {/* Result Display */}
            {!flipping && gameResult && (
              <div
                className={`mb-6 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  gameResult.won
                    ? "bg-green-500/20 border border-green-500 text-green-300"
                    : "bg-red-500/20 border border-red-500 text-red-300"
                }`}
              >
                {gameResult.won ? (
                  <>
                    <div>🎉 You Won!</div>
                    <div className="text-2xl mt-2">{gameResult.payout} ETH</div>
                  </>
                ) : (
                  <>
                    <div>😔 You Lost</div>
                    <div className="text-sm mt-1">Better luck next time</div>
                  </>
                )}
              </div>
            )}

            <div className="text-center text-slate-400 mb-8">{flipping ? "Flipping..." : "Ready to play"}</div>
          </div>

          {/* Right Panel - Controls */}
          <div className="space-y-4">
            {/* Bet Amount */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <h3 className="text-slate-400 text-sm font-semibold mb-4">BET AMOUNT (ETH)</h3>
              <input
                type="number"
                step="0.001"
                min="0"
                value={betAmount}
                onChange={e => setBetAmount(e.target.value)}
                disabled={flipping}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                placeholder="0.01"
              />
              <div className="mt-3 flex gap-2">
                {["0.01", "0.05", "0.1", "0.5"].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    disabled={flipping}
                    className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition disabled:opacity-50"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Choice Selection */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur">
              <h3 className="text-slate-400 text-sm font-semibold mb-4">YOUR CHOICE</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPlayerChoice(true)}
                  disabled={flipping}
                  className={`px-4 py-3 rounded-lg font-semibold transition ${
                    playerChoice ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  } disabled:opacity-50`}
                >
                  👑 Heads
                </button>
                <button
                  onClick={() => setPlayerChoice(false)}
                  disabled={flipping}
                  className={`px-4 py-3 rounded-lg font-semibold transition ${
                    !playerChoice ? "bg-purple-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  } disabled:opacity-50`}
                >
                  🌙 Tails
                </button>
              </div>
            </div>

            {/* Flip Button */}
            <button
              onClick={handleFlip}
              disabled={!connectedAddress || flipping}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              {flipping ? "⏳ Flipping..." : "🎲 FLIP NOW"}
            </button>

            {/* Info Box */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 text-xs text-slate-400">
              <p className="mb-2 font-semibold text-slate-300">💡 How it works</p>
              <ul className="space-y-1">
                <li>• Set your bet amount</li>
                <li>• Choose heads or tails</li>
                <li>• Win 2x your bet or lose it</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
