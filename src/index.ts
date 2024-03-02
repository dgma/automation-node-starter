import * as dotenv from "dotenv";
import { createClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { example } from "./example";

const config = dotenv.config({ path: "./.env.local" });

const node_pk = config?.parsed?.NODE_PK || process.env.NODE_PK;
const rpc = config?.parsed?.RPC || process.env.RPC;

if (!node_pk || !rpc) {
  throw new Error("Configuration mistake. Check your env file");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nodeClient = createClient({
  account: privateKeyToAccount(node_pk as `0x${string}`),
  chain: hardhat,
  transport: http(rpc),
});

console.log(example());
