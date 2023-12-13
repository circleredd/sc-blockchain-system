import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import axios from 'axios';
// import Web3 from 'web3';

axios.defaults.baseURL = 'http://localhost:5000/api';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <div>
        <App />
    </div>
);
