// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit'; // JS import of createSlice :contentReference[oaicite:3]{index=3}

const initialState = {
  coins: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCoins(state, action) {
      state.coins = action.payload;
    },
    updateCoin(state, action) {
      const { id, ...changes } = action.payload;
      const coin = state.coins.find(c => c.id === id);
      if (coin) {
        Object.assign(coin, changes);
      }
    },
  },
});

export const { setCoins, updateCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;
