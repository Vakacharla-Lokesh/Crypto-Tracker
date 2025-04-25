// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit'; // JS import of createSlice :contentReference[oaicite:3]{index=3}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async () => {
  const res = await axios.get(/* your new API endpoint */);
  return res.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { coins: [], status: 'idle', error: null },
  reducers: { updateCoin(state, action) { /* ... */ } },
  extraReducers: builder => {
    builder
      .addCase(fetchCoins.pending, state => { state.status = 'loading'; })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCoins, updateCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;
