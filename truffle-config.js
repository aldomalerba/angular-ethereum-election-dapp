var HDWalletProvider = require("truffle-hdwallet-provider");
const REMOTE_NODE = process.env.REMOTE_NODE
const MNEMONIC = process.env.MNEMONIC
console.log("MNEMONIC",MNEMONIC)
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, REMOTE_NODE)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.8.1",
    }
  }
};
