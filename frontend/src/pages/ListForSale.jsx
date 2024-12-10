import { useAccount } from '../components/AccountProvider';
import ListNFTForSale from '../components/ListNFTForSale';

const ListForSale = () => {
  const { account } = useAccount();

  return (
    <div>
      <h1>List Your NFT for Sale</h1>
      {account ? (
        <ListNFTForSale account={account} />
      ) : (
        <p>Please connect your wallet to list NFTs for sale.</p>
      )}
    </div>
  );
};

export default ListForSale;