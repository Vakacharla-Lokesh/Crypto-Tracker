// src/components/CryptoTable.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoins } from '../features/crypto/cryptoSlice';

export default function CryptoTable() {
  const dispatch = useDispatch();
  const { coins, status, error } = useSelector(state => state.crypto);
  const [search, setSearch] = useState('');

  // Fetch coins once on mount
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  // Memoize filtered list
  const filteredCoins = useMemo(() => {
    const term = search.toLowerCase();
    return coins.filter(
      c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term)
    );
  }, [coins, search]);

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search Crypto"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Logo</th><th>Name</th><th>Symbol</th><th>Price</th>
            <th>1h%</th><th>24h%</th><th>7d%</th><th>Market Cap</th>
            <th>24h Volume</th><th>Circulating</th><th>Max</th><th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map(coin => (
            <tr key={coin.id}>
              <td><img src={coin.logo} alt={coin.symbol} width="24" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.price.toFixed(2)}</td>
              <td className={coin.percent1h >= 0 ? 'pos' : 'neg'}>
                {coin.percent1h.toFixed(2)}%
              </td>
              <td className={coin.percent24h >= 0 ? 'pos' : 'neg'}>
                {coin.percent24h.toFixed(2)}%
              </td>
              <td className={coin.percent7d >= 0 ? 'pos' : 'neg'}>
                {coin.percent7d.toFixed(2)}%
              </td>
              <td>${coin.marketCap.toLocaleString()}</td>
              <td>${coin.volume24h.toLocaleString()}</td>
              <td>{coin.circulatingSupply.toLocaleString()}</td>
              <td>{coin.maxSupply?.toLocaleString() || '—'}</td>
              <td>
                {/* Placeholder for sparkline, replace with actual sparkline component */}
                <img src={`data:image/svg+xml;utf8,<svg>…</svg>`} alt="7d chart" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
