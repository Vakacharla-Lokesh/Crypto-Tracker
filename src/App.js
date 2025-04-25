// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Coin from './Coin';
import { fetchCoins } from './features/crypto/cryptoSlice';

function App() {
  const dispatch = useDispatch();
  const { coins, status, error } = useSelector(state => state.crypto);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch coins when component mounts if we don't have them yet
    if (status === 'idle') {
      dispatch(fetchCoins());
    }
  }, [status, dispatch]);

  const handleChange = e => setSearch(e.target.value);

  const filteredCoins = useMemo(() => 
    coins.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    ),
    [coins, search]
  );

  if (status === 'loading') return <div className="App"><h1 className="page-title">Loading...</h1></div>;
  if (error) return <div className="App"><h1 className="page-title">Error: {error}</h1></div>;

  return (
    <div className="App">
      <h1 className="page-title">Live Crypto Price Tracker</h1>
      <div className="credentials">
        <a href="https://coinmarketcap.com/" target="_blank" rel="noopener noreferrer">
          Powered by CoinMarketCap
        </a>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Crypto"
          className="coin-input"
          value={search}
          onChange={handleChange}
        />
      </div>

      <div className="center table-headings">
        <div className="coin">
          <p className="coin-symbol">Name</p>
          <p className="coin-symbol symbol-header">Symbol</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">Price</p>
          <p className="coin-percent">24h Change</p>
          <p className="coin-volume">24h Volume</p>
          <p className="coin-marketcap">Market Cap</p>
        </div>
      </div>

      <div className="coin-data-display">
        {filteredCoins.length === 0 ? (
          <div className="no-search-result">
            <h3>No Search Results Found!</h3>
            <p>
              Please check your spelling—this tracker only shows the top 200 coins.
            </p>
          </div>
        ) : (
          filteredCoins.map(coin => (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              price={coin.current_price}
              symbol={coin.symbol}
              volume={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />
          ))
        )}
      </div>
      
      <div className="empty-div"></div>
      <footer>
        Crypto Tracker - Live Price Updates
        <a href="https://coinmarketcap.com/" target="_blank" rel="noopener noreferrer"> - CoinMarketCap</a>
      </footer>
    </div>
  );
}

export default App;