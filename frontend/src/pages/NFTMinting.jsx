import { useParams } from 'react-router-dom';
import NFTMinter from '../components/NFTMinter';

const NFTMinting = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>Mint a New Travel NFT</h1>
      <p>Category ID: {categoryId}</p>
      <NFTMinter categoryId={categoryId} />
    </div>
  );
};

export default NFTMinting;