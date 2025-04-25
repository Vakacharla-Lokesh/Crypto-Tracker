// src/utils/mockSocket.js
import { store } from '../app/store';
import { updateCoin } from '../features/crypto/cryptoSlice';  // <-- make sure this path is correct

class MockSocket {
  start() {
    this.intervalId = setInterval(() => {
      const coins = store.getState().crypto.coins;
      const random = coins[Math.floor(Math.random() * coins.length)];
      store.dispatch(
        updateCoin({
          id: random.id,
          price: +(random.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
          percent1h: +(Math.random() * 4 - 2).toFixed(2),
          percent24h: +(Math.random() * 10 - 5).toFixed(2),
          volume24h: random.volume24h * (1 + (Math.random() - 0.5) * 0.1),
        })
      );
    }, 1500);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

export default new MockSocket();
