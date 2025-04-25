// src/features/crypto/cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock data to use when API fails due to CORS
const mockCryptoData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "btc",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    current_price: 55000.45,
    price_change_percentage_24h: 2.35,
    total_volume: 32547896541,
    market_cap: 1043256789012,
  },
  {
    id: 1027,
    name: "Ethereum",
    symbol: "eth",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    current_price: 2400.75,
    price_change_percentage_24h: -1.24,
    total_volume: 12458963254,
    market_cap: 285643129854,
  },
  {
    id: 1839,
    name: "Binance Coin",
    symbol: "bnb",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    current_price: 325.50,
    price_change_percentage_24h: 0.78,
    total_volume: 2145789632,
    market_cap: 54789632145,
  },
  {
    id: 5426,
    name: "Solana",
    symbol: "sol",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    current_price: 115.25,
    price_change_percentage_24h: 3.42,
    total_volume: 3254789632,
    market_cap: 39875643215,
  },
  {
    id: 2010,
    name: "Cardano",
    symbol: "ada",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    current_price: 0.45,
    price_change_percentage_24h: -0.53,
    total_volume: 1245789632,
    market_cap: 15423698752,
  },
  {
    id: 52,
    name: "XRP",
    symbol: "xrp",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    current_price: 0.58,
    price_change_percentage_24h: 1.22,
    total_volume: 2145789632,
    market_cap: 30147852963,
  },
  {
    id: 74,
    name: "Dogecoin",
    symbol: "doge",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
    current_price: 0.12,
    price_change_percentage_24h: -2.12,
    total_volume: 1547896325,
    market_cap: 16587452369,
  },
  {
    id: 3408,
    name: "USD Coin",
    symbol: "usdc",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    current_price: 1.00,
    price_change_percentage_24h: 0.01,
    total_volume: 32547896547,
    market_cap: 43256789451,
  },
  {
    id: 825,
    name: "Tether",
    symbol: "usdt",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    current_price: 1.00,
    price_change_percentage_24h: 0.00,
    total_volume: 41254789652,
    market_cap: 82547896325,
  },
  {
    id: 6636,
    name: "Polkadot",
    symbol: "dot",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    current_price: 7.85,
    price_change_percentage_24h: -0.75,
    total_volume: 987456321,
    market_cap: 9874563214,
  }
];

// Async thunk to fetch coins from CoinMarketCap
export const fetchCoins = createAsyncThunk(
  'crypto/fetchCoins',
  async (_, { rejectWithValue }) => {
    try {
      // Try to make the API call
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          params: {
            start: '1',
            limit: '200',
            convert: 'USD'
          },
          headers: {
            'X-CMC_PRO_API_KEY': '36213518-db13-4a2b-8683-71982905d37e'
          }
        }
      );
      
      // Transform CoinMarketCap data
      return response.data.data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        current_price: coin.quote.USD.price,
        price_change_percentage_24h: coin.quote.USD.percent_change_24h,
        total_volume: coin.quote.USD.volume_24h,
        market_cap: coin.quote.USD.market_cap,
        circulating_supply: coin.circulating_supply,
        max_supply: coin.max_supply
      }));
    } catch (err) {
      console.error("API Error:", err);
      console.log("Using mock data due to CORS or API limitations");
      
      // If CORS error occurs, return mock data instead
      return mockCryptoData;
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    coins: [],
    status: 'idle',
    error: null
  },
  reducers: {
    updateCoin: (state, action) => {
      const index = state.coins.findIndex(coin => coin.id === action.payload.id);
      if (index !== -1) {
        state.coins[index] = {
          ...state.coins[index],
          ...action.payload
        };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCoins.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default cryptoSlice.reducer;
export const { updateCoin } = cryptoSlice.actions;