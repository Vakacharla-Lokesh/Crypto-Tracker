import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';               // ← corrected path
import { store } from './app/store';
import mockSocket from './utils/mockSocket';

// Start simulated updates
mockSocket.start();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
