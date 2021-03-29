const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    // Deploy Dapp Token
    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()

    // Deploy TokenFarm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Tokens are stored as integers, so 1,000,000 + 18 decimal places (0's) = 100000000000000000000000
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    await daiToken.transfer(accounts[1], '1000000000000000000000000')
}
