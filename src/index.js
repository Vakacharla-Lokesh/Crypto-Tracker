// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';           // JS binding for React-Redux :contentReference[oaicite:10]{index=10}
import App from './App';
import { store } from './app/store';
import mockSocket from './utils/mockSocket';

mockSocket.start();                               // Start mock updates on load

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
