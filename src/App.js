// src/App.js

import React, { useState, useEffect, useMemo } from 'react';       // React Hooks for state, effects, memoization :contentReference[oaicite:0]{index=0}
import axios from 'axios';                                         // HTTP client for fetching data :contentReference[oaicite:1]{index=1}
import './App.css';                                                // Your styles
import Coin from './Coin';                                         // Coin card component

function App() {
  const [coins, setCoins] = useState([]);                          // Local state for fetched coins
  const [search, setSearch] = useState('');                       // Search input

  useEffect(() => {
    // Fetch top 200 coins once on mount
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 200,
            page: 1,
            sparkline: false,
          },
        }
      )
      .then(res => setCoins(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);                                                        // ← empty deps array ensures this runs only once :contentReference[oaicite:2]{index=2}

  const handleChange = e => setSearch(e.target.value);

  const filteredCoins = useMemo(() => 
    coins.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    ),
    [coins, search]
  );                                                             // Memoize filter for performance :contentReference[oaicite:3]{index=3}

  return (
    <div className="App">
      <h1 className="page-title">Live Crypto Price Tracker</h1>
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
    </div>
  );
}

export default App;
