// src/utils/mockSocket.js
import { store } from '../app/store';
import { updateCoin } from '../features/crypto/cryptoSlice';

class MockSocket {
  start() {
    // Wait until we have coins before starting the interval
    this.checkInterval = setInterval(() => {
      const { coins, status } = store.getState().crypto;
      
      // If we have coins, start the update interval and clear this check
      if (status === 'succeeded' && coins.length > 0) {
        clearInterval(this.checkInterval);
        this.startUpdates();
      }
    }, 1000);
  }

  startUpdates() {
    this.intervalId = setInterval(() => {
      const coins = store.getState().crypto.coins;
      if (coins.length > 0) {
        const randomIndex = Math.floor(Math.random() * coins.length);
        const randomCoin = coins[randomIndex];
        
        // Create a randomized price update
        const priceChange = (Math.random() - 0.5) * 0.02; // -1% to +1%
        const newPrice = randomCoin.current_price * (1 + priceChange);
        const newPriceChangePercentage = 
          randomCoin.price_change_percentage_24h + (Math.random() - 0.5);
        
        store.dispatch(
          updateCoin({
            id: randomCoin.id,
            current_price: +newPrice.toFixed(2),
            price_change_percentage_24h: +newPriceChangePercentage.toFixed(2),
            total_volume: 
              randomCoin.total_volume * (1 + (Math.random() - 0.5) * 0.05),
          })
        );
      }
    }, 3000);
  }

  stop() {
    clearInterval(this.checkInterval);
    clearInterval(this.intervalId);
  }
}

export default new MockSocket();