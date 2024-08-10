import { createClient, createPublicClient, webSocket, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type { SupportedChains } from "./chains";
import chains from "./chains";

export const node_pk = process.env.NODE_PK;
export const rpc = process.env.RPC;
export const ws_rpc = process.env.WS_RPC;
export const network = (process.env.NETWORK || "localhost") as SupportedChains;

export const wsPublicClient = createPublicClient({
  chain: chains[network],
  transport: webSocket(ws_rpc),
});

export const httpPublicClient = createPublicClient({
  chain: chains[network],
  transport: http(rpc),
});

export const httpClient = createClient({
  account: privateKeyToAccount(node_pk as `0x${string}`),
  chain: chains[network],
  transport: http(rpc),
});
