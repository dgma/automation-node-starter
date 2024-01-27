import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { example } from "./example";

const config = dotenv.config({ path: "./.env.local" });

const wallet_pk = config?.parsed?.NODE_PK || process.env.NODE_PK;
const rpc = config?.parsed?.RPC || process.env.RPC;

if (!wallet_pk || !rpc) {
  throw new Error("Configuration mistake. Check your env file");
}

console.log("wallet_pk", wallet_pk);
console.log("rpc", rpc);

const provider = new ethers.providers.JsonRpcProvider(rpc);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wallet = new ethers.Wallet(wallet_pk, provider);

console.log(example());
