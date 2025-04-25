import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCoins } from '../features/crypto/cryptoSlice';

const CryptoTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          {
            params: {
              start: '1',
              limit: '5',
              convert: 'USD',
            },
            headers: {
              'X-CMC_PRO_API_KEY': 'YOUR_API_KEY_HERE',
            },
          }
        );
        const coinsData = response.data.data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.quote.USD.price,
          percent_change_1h: coin.quote.USD.percent_change_1h,
          percent_change_24h: coin.quote.USD.percent_change_24h,
          percent_change_7d: coin.quote.USD.percent_change_7d,
          market_cap: coin.quote.USD.market_cap,
          volume_24h: coin.quote.USD.volume_24h,
          circulating_supply: coin.circulating_supply,
          max_supply: coin.max_supply,
          logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        }));
        dispatch(setCoins(coinsData));
      } catch (error) {
        console.error('Error fetching data from CoinMarketCap:', error);
      }
    };

    fetchCryptoData();
  }, [dispatch]);

  // ... rest of your component
};

export default CryptoTable;
