// src/utils/mockSocket.js
import { store } from '../app/store';         // Access store in JS :contentReference[oaicite:6]{index=6}
import { updateCoin } from '../features/crypto/cryptoSlice';

class MockSocket {
  start() {
    setInterval(() => {                       // use setInterval in a JS module :contentReference[oaicite:7]{index=7}
      const state = store.getState().crypto.coins;
      const coin = state[Math.floor(Math.random() * state.length)];
      const priceDelta = (Math.random() - 0.5) * 0.02 * coin.current_price;
      store.dispatch(updateCoin({
        id: coin.id,
        current_price: +(coin.current_price + priceDelta).toFixed(2),
        price_change_percentage_1h_in_currency: +(Math.random() * 4 - 2).toFixed(2),
        price_change_percentage_7d_in_currency: +(Math.random() * 10 - 5).toFixed(2),
        total_volume: coin.total_volume * (1 + (Math.random() - 0.5) * 0.1),
      }));
    }, 1500);
  }
}

export default new MockSocket();
