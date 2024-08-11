// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  transform: {
    // '^.+\\.[tj]sx?$' to process ts,js,tsx,jsx with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process ts,js,tsx,jsx,mts,mjs,mtsx,mjsx with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
