# erc20-token-wallet
A simple wallet interface providing transfer functionality for Ethereum blockchain ERC20 smart contracts.

## Usage

The wallet interface is hosted via GitHub Pages at [https://peter-evans.github.io/erc20-token-wallet](https://peter-evans.github.io/erc20-token-wallet/)

A compatible wallet provider is required, such as MetaMask.

[![Download MetaMask](/images/download-metamask-dark.png?raw=true)](https://metamask.io/)

The wallet connects to the [ERC-20 Test Standard Token (TST)](https://github.com/uzyn/ERC20-TST) smart contract for testing purposes. The smart contract the wallet interfaces with can be changed by editing the following lines in [index.js](index.js).

```javascript
const abi = JSON.parse(
  '[...]'
);
const decimals = 18;
const tokenSymbol = "TST";
contractInstance = web3.eth
  .contract(abi)
  .at("0x3efd578b271d034a69499e4a2d933c631d44b9ad");
```

## Test Standard Token (TST)

TST tokens can be created for free by following the instructions [here](https://github.com/uzyn/ERC20-TST).


## License

MIT License - see the [LICENSE](LICENSE) file for details
