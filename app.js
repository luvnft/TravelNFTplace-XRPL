// Importing required packages
const express = require('express');
const xrpl = require('xrpl');

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Function to connect to the XRP Ledger
async function connectToLedger() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');  // Connect to XRP testnet
  await client.connect();
  return client;
}

// Endpoint to mint an NFT
app.post('/mint', async (req, res) => {
  const client = await connectToLedger();

  // Generate a new wallet for minting the NFT
  const wallet = xrpl.Wallet.generate();

  try {
    // Create the transaction to mint the NFT
    const mintTx = {
      TransactionType: "NFTokenMint",
      Account: wallet.address,
      NFTokenTaxon: 0,  // Customizable NFT Taxon
      Flags: 8,          // Set appropriate flags for NFT minting
      URI: xrpl.convertStringToHex(req.body.uri),  // Convert URI to hex
      Fee: "10"  // Transaction fee (adjust as needed)
    };

    // Submit the mint transaction to the ledger
    const mintResult = await client.submitAndWait(mintTx, { wallet });
    res.json({ result: mintResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.disconnect();
  }
});

// Endpoint to list NFTs owned by an address
app.get('/nfts/:address', async (req, res) => {
  const client = await connectToLedger();

  try {
    // Fetch the NFTs for the specified address
    const nfts = await client.request({
      command: "account_nfts",
      account: req.params.address
    });

    // Return the list of NFTs
    res.json(nfts.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.disconnect();
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
