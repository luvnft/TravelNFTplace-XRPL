import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './components/AccountProvider';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ListForSale from './pages/ListForSale';
import NFTMinting from './pages/NFTMinting';

function App() {
  return (
    <AccountProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/list-for-sale" element={<ListForSale />} />
            <Route path="/mint/:categoryId" element={<NFTMinting />} />
          </Routes>
        </div>
      </Router>
    </AccountProvider>
  );
}

export default App;