import  { useState } from 'react';
import { Buffer } from 'buffer';
import xumm from '../xaman';

function NFTMinter() {
  const [uri, setUri] = useState('');

  const mintNFT = async () => {
    const request = await xumm.payload.create({
      TransactionType: 'NFTokenMint',
      NFTokenTaxon: 0,
      URI: Buffer.from(uri, 'utf8').toString('hex'),
    });

    // Open Xaman app for signing
    xumm.xapp.openSignRequest(request.uuid);
  };

  return (
    <div>
      <input
        type="text"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        placeholder="NFT Metadata URI"
      />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
}

export default NFTMinter;
