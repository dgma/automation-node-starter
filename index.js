const axios = require('axios');
const { ethers, utils } = require('ethers');
const config = require("dotenv").config({ path: './.env.local' });
const deploymentLock = require('@dgma/protocol/deployment-lock.json');
const FakeOracleABI = require('@dgma/protocol/abi/contracts/emulation/fakeOracles/IFakeOracle.sol/IFakeOracle.json');

const ETHFakeOracleAddress = deploymentLock.rabbit.ETHFakeOracle.address;
const USDgmFakeOracleAddress = deploymentLock.rabbit.USDgmFakeOracle.address;
const wallet_pk = config?.parsed?.ORACLE_NODE_PK || process.env.ORACLE_NODE_PK;
const rpc = config?.parsed?.RPC || process.env.RPC;

const wait = (ms = 0) => new Promise((res) => setTimeout(res, ms));

const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(wallet_pk, provider);

const ETH_OracleContract = new ethers.Contract(ETHFakeOracleAddress, FakeOracleABI, wallet);
const USDgmOracleContract = new ethers.Contract(USDgmFakeOracleAddress, FakeOracleABI, wallet);


async function ETH_FeedUpdater() {
  const response = await axios.get(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
    );
  const newPrice = response.data.USD;
  console.log('new price from api:', newPrice);
  const price = Number(utils.formatEther(await ETH_OracleContract.latestRoundData()));
  console.log('price on oracle:',  price);
  const vol = price ? Math.abs(newPrice - price) / price : 1;
  if (vol > 0.005) {
    console.log('volatility is above minimum, update price')
    await ETH_OracleContract.setPrice(utils.parseUnits(newPrice.toString())).then(tx => tx.wait(1))
  }
  await wait(60000);
  return ping();
};

USDgmOracleContract.setPrice(utils.parseUnits("1.0"))
  .then(tx => tx.wait(1))
  .then(ETH_FeedUpdater)
