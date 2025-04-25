// src/features/crypto/cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch top 5 coins from CoinMarketCap
export const fetchCoins = createAsyncThunk(
  'crypto/fetchCoins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          params: { start: '1', limit: '5', convert: 'USD' },
          headers: { 'X-CMC_PRO_API_KEY': '36213518-db13-4a2b-8683-71982905d37e' }
        }
      );
      // Map API response to slice state shape
      return response.data.data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        price: coin.quote.USD.price,
        percent1h: coin.quote.USD.percent_change_1h,
        percent24h: coin.quote.USD.percent_change_24h,
        percent7d: coin.quote.USD.percent_change_7d,
        marketCap: coin.quote.USD.market_cap,
        volume24h: coin.quote.USD.volume_24h,
        circulatingSupply: coin.circulating_supply,
        maxSupply: coin.max_supply,
        sparkline7d: coin.quote.USD.sparkline // if supported by your plan
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data?.status?.error_message || err.message);
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    coins: [],
    status: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    // you can add updateCoin for mock socket updates here
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
