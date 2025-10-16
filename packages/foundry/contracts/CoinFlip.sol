// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CoinFlip {
    struct BetInfo {
        address player;
        uint256 betAmount;
        bool playerChoice; // true = heads, false = tails
        bool result;
        bool hasResult;
        bool won;
    }

    mapping(uint256 => BetInfo) public bets;
    mapping(address => uint256) public lastBetId;
    uint256 public requestCounter = 0;
    uint256 private nonce = 0;
    address public owner;
    uint256 public totalEarnings = 0;

    event CoinFlipped(
        address indexed player,
        uint256 requestId,
        uint256 betAmount,
        bool choice
    );
    event CoinFlipResult(
        address indexed player,
        uint256 requestId,
        bool result,
        bool won,
        uint256 payout
    );

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool playerChoice)
        external
        payable
        returns (uint256 requestId)
    {
        require(msg.value > 0, "Bet amount must be greater than 0");

        requestId = requestCounter;
        requestCounter++;

        // Simple randomness (not secure for production, but works for demo)
        uint256 randomWords = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender,
                    nonce
                )
            )
        );
        nonce++;

        bool coinResult = (randomWords % 2) == 0; // true = heads, false = tails
        bool won = playerChoice == coinResult;
        uint256 payout = 0;

        // If player wins, send them 2x their bet
        if (won) {
            payout = msg.value * 2;
            (bool success, ) = msg.sender.call{value: payout}("");
            require(success, "Payout transfer failed");
        } else {
            // If player loses, keep the bet (goes to contract)
            totalEarnings += msg.value;
        }

        bets[requestId] = BetInfo({
            player: msg.sender,
            betAmount: msg.value,
            playerChoice: playerChoice,
            result: coinResult,
            hasResult: true,
            won: won
        });

        lastBetId[msg.sender] = requestId;
        
        emit CoinFlipped(msg.sender, requestId, msg.value, playerChoice);
        emit CoinFlipResult(msg.sender, requestId, coinResult, won, payout);
    }

    function getBetInfo(uint256 requestId)
        external
        view
        returns (BetInfo memory)
    {
        return bets[requestId];
    }

    function getResult(address player)
        external
        view
        returns (bool result, bool hasWon, bool hasResult, uint256 payout)
    {
        uint256 betId = lastBetId[player];
        BetInfo memory bet = bets[betId];
        
        uint256 payoutAmount = 0;
        if (bet.won) {
            payoutAmount = bet.betAmount * 2;
        }
        
        return (bet.result, bet.won, bet.hasResult, payoutAmount);
    }

    function withdraw() external {
        // Simple withdrawal for testing
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    receive() external payable {}
}
