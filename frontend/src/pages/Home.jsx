import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';

const categories = [
  { id: 1, name: 'Landmarks', image: 'landmark.jpg' },
  { id: 2, name: 'Landscapes', image: 'landscape.jpg' },
  { id: 3, name: 'Cityscapes', image: 'cityscape.jpg' },
];

const Home = () => {
  return (
    <div>
      <h1>Travel NFT Market</h1>
      <WalletConnect />
      <Link to="/marketplace">
        <button>View Marketplace</button>
      </Link>
      <Link to="/list-for-sale">
        <button>List NFT for Sale</button>
      </Link>
      <h2>Mint New NFT</h2>
      <div className="categories">
        {categories.map(category => (
          <Link key={category.id} to={`/mint/${category.id}`}>
            <div className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;