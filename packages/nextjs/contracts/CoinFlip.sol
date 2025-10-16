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
    uint256 public requestCounter = 0;
    uint256 private nonce = 0;

    event CoinFlipped(
        address indexed player,
        uint256 requestId,
        uint256 betAmount,
        bool choice
    );
    event CoinFlipResult(
        address indexed player,
        bool result,
        bool won,
        uint256 payout
    );

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

        bets[requestId] = BetInfo({
            player: msg.sender,
            betAmount: msg.value,
            playerChoice: playerChoice,
            result: coinResult,
            hasResult: true,
            won: won
        });

        uint256 payout = 0;
        if (won) {
            // Player wins 2x their bet
            payout = msg.value * 2;
            (bool success, ) = msg.sender.call{value: payout}("");
            require(success, "Transfer failed");
        }
        // If lost, the bet is kept by the contract (house)

        emit CoinFlipped(msg.sender, requestId, msg.value, playerChoice);
        emit CoinFlipResult(msg.sender, coinResult, won, payout);
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
        returns (
            bool,
            bool,
            bool,
            uint256
        )
    {
        // Return the latest bet info for a player
        // For now, returning a simplified version
        return (false, false, false, 0);
    }

    function withdraw() external {
        // Simple withdrawal for testing
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    receive() external payable {}
}
}
