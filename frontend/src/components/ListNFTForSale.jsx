import  { useState, useEffect } from 'react';
import { useAccount } from '../components/AccountProvider';
import { Xumm } from 'xumm';

const xumm = new Xumm('0c2388da-7eb1-4654-94a1-65f15ebdb394');

const ListNFTForSale = () => {
  const { account } = useAccount();
  const [userNFTs, setUserNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchUserNFTs = async () => {
      if (account) {
        // Fetch user's NFTs from XRP Ledger
        const nfts = await xumm.xrpl.getNFTs(account);
        setUserNFTs(nfts);
      }
    };
    fetchUserNFTs();
  }, [account]);

  const handleListForSale = async () => {
    if (!selectedNFT || !price) return;

    try {
      const offer = await xumm.payload.create({
        TransactionType: 'NFTokenCreateOffer',
        Account: account,
        NFTokenID: selectedNFT,
        Amount: xumm.xrpl.xrpToDrops(price),
        Flags: 1 // 1 for sell offer
      });

      console.log('Offer created:', offer);
      // Handle successful listing (e.g., show success message, update UI)
    } catch (error) {
      console.error('Error listing NFT:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>List Your NFT for Sale</h2>
      <select onChange={(e) => setSelectedNFT(e.target.value)}>
        <option value="">Select an NFT</option>
        {userNFTs.map((nft) => (
          <option key={nft.NFTokenID} value={nft.NFTokenID}>
            {nft.NFTokenID}
          </option>
        ))}
      </select>
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price in XRP"
      />
      <button onClick={handleListForSale}>List for Sale</button>
    </div>
  );
};

export default ListNFTForSale;