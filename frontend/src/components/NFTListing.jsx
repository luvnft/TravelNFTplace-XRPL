import  { useEffect, useState } from 'react';
import { Client } from 'xrpl';
import PropTypes from 'prop-types';

function NFTListing({ address }) {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const client = new Client('wss://xrplcluster.com');
      await client.connect();

      const response = await client.request({
        command: 'account_nfts',
        account: address,
      });

      setNfts(response.result.account_nfts);
      client.disconnect();
    };

    fetchNFTs();
  }, [address]);

  return (
    <div>
      <h2>Your NFTs</h2>
      {nfts.map((nft, index) => (
        <div key={index}>
          <p>NFT ID: {nft.NFTokenID}</p>
          <p>URI: {nft.URI}</p>
        </div>
      ))}
    </div>
  );
}
NFTListing.propTypes = {
  address: PropTypes.string.isRequired,
};

export default NFTListing;
