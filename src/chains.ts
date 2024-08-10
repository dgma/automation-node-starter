import * as viemChains from "viem/chains";

const chains = {
  arbitrumSepolia: viemChains.arbitrumSepolia,
  localhost: viemChains.localhost,
} as const;

export type SupportedChains = keyof typeof chains;

export default chains;
