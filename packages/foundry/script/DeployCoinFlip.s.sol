//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DeployHelpers.s.sol";
import { CoinFlip } from "../contracts/CoinFlip.sol";

/**
 * @notice Deploy script for CoinFlip contract
 * @dev Deploy this with yarn deploy --file DeployCoinFlip
 */
contract DeployCoinFlip is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        CoinFlip coinFlip = new CoinFlip();
        console.logString(
            string(
                abi.encodePacked(
                    "CoinFlip deployed at: ",
                    vm.toString(address(coinFlip))
                )
            )
        );
        
        // Record the deployment
        deployments.push(
            Deployment({ name: "CoinFlip", addr: address(coinFlip) })
        );
    }
}
