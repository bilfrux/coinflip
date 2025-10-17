import * as chains from "viem/chains";

export type BaseConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export type ScaffoldConfig = BaseConfig;

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// Détecte si on est en local (yarn dev) ou en production (Vercel)
const isLocalEnvironment =
  typeof window === "undefined"
    ? false
    : window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const targetNetwork = isLocalEnvironment ? [chains.foundry] : [chains.sepolia];

const scaffoldConfig = {
  // The networks on which your DApp is live
  // Use localhost for local development, Sepolia for production
  targetNetworks: targetNetwork,
  // The interval at which your front-end polls the RPC servers for new data (it has no effect if you only target the local network (default is 4000))
  pollingInterval: isLocalEnvironment ? 4000 : 30000,
  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,
  // If you want to use a different RPC for a specific network, you can add it here.
  // The key is the chain ID, and the value is the HTTP RPC URL
  rpcOverrides: {
    [chains.sepolia.id]: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY || ""}`,
    [chains.foundry.id]: "http://127.0.0.1:8545",
  },
  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: isLocalEnvironment,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
