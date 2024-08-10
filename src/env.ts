import * as dotenvx from "@dotenvx/dotenvx";
import type { SupportedChains } from "./chains";
// decrypted .env.production file, see decryption logic in makefile
// more info https://github.com/dotenvx/dotenvx
const config = dotenvx.config({ path: ".env.production" });

const getEnv = (prop: string) => config?.parsed?.[prop] || process.env[prop];

export const node_pk = getEnv("NODE_PK");
export const rpc = getEnv("RPC");
export const ws_rpc = getEnv("WS_RPC");
export const network = (getEnv("NETWORK") || "localhost") as SupportedChains;

if (!node_pk || !rpc || !ws_rpc || !network) {
  throw new Error("Configuration mistake. Check your env file");
}

export default getEnv;
