const hre = require("hardhat");
const { ethers } = require("ethers");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
  console.log(`Preparing deployment...\n`);

  // Fetch contract to deploy
  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const TransactionRating = await hre.ethers.getContractFactory("TransactionRating");
  const Dappcord = await hre.ethers.getContractFactory("Dappcord");
  
  // Deploy SocialExchange contract
  const SocialExchange = await hre.ethers.getContractFactory("SocialExchange");
  const socialExchange = await SocialExchange.deploy();
  await socialExchange.deployed();
  console.log(`SocialExchange contract deployed to: ${socialExchange.address}`);

  // Fetch accounts
  const accounts = await hre.ethers.getSigners();

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`);

  // Deploy TransactionRating contract
  const transactionRating = await TransactionRating.deploy();
  await transactionRating.deployed();
  console.log(`TransactionRating contract deployed to: ${transactionRating.address}`);

  // Deploy Token contracts
  const stx = await Token.deploy("Soshal Exchange", "STX", "1000000");
  await stx.deployed();
  console.log(`STX Deployed to: ${stx.address}`);

  const mETH = await Token.deploy("mETH", "mETH", "1000000");
  await mETH.deployed();
  console.log(`mETH Deployed to: ${mETH.address}`);

  const mDAI = await Token.deploy("mDAI", "mDAI", "1000000");
  await mDAI.deployed();
  console.log(`mDAI Deployed to: ${mDAI.address}`);

  // Deploy Exchange contract
  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log(`Exchange Deployed to: ${exchange.address}`);

  // Deploy Dappcord contract
  const NAME = "Dappcord";
  const SYMBOL = "DC";
  const dappcord = await Dappcord.deploy(NAME, SYMBOL);
  await dappcord.deployed();
  console.log(`Deployed Dappcord Contract at: ${dappcord.address}`);

  // Create 3 Channels
  const CHANNEL_NAMES = ["general", "intro", "jobs"];
  const COSTS = [tokens(1), tokens(0), tokens(0.25)];

  for (var i = 0; i < 3; i++) {
    const transaction = await dappcord.connect(accounts[0]).createChannel(CHANNEL_NAMES[i], COSTS[i]);
    await transaction.wait();
    console.log(`Created text channel #${CHANNEL_NAMES[i]}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
