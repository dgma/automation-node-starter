const axios = require('axios');
const { ethers, utils } = require('ethers');
const config = require("dotenv").config({ path: './.env.local' });
const deploymentLock = require('@dgma/protocol/deployment-lock.json');
const ETHFakeOracleABi = require('@dgma/protocol/abi/contracts/emulation/fakeOracles/oracles.sol/ETHFakeOracle.json');

const ETHFakeOracleAddress = deploymentLock.rabbit.ETHFakeOracle.address;
const wallet_pk = config?.parsed?.ORACLE_NODE_PK || process.env.ORACLE_NODE_PK;


const wait = (ms = 0) => new Promise((res) => setTimeout(res, ms));

const provider = new ethers.providers.JsonRpcProvider('https://dgma.dev:8443');
const wallet = new ethers.Wallet(wallet_pk, provider);

const contract = new ethers.Contract(ETHFakeOracleAddress, ETHFakeOracleABi, wallet);

async function ping() {
  const response = await axios.get(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
    );
  const newPrice = response.data.USD;
  console.log('new price from api:', newPrice);
  const price = Number(utils.formatEther(await contract.latestRoundData()));
  console.log('price on oracle:',  price);
  const vol = price ? Math.abs(newPrice - price) / price : 1;
  if (vol > 0.005) {
    console.log('volatility is above minimum, update price')
    await contract.setPrice(utils.parseUnits(newPrice.toString())).then(tx => tx.wait(1))
  }
  await wait(60000);
  return ping();
};

ping();


// (145308 - 144611) / 