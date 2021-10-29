import React from 'react';
import ReactDOM from 'react-dom';
import { isBrowser } from 'react-device-detect';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    {isBrowser?
      <AuthContextProvider>
        <App/>
      </AuthContextProvider>
    :
      <h1>For now the site is only available for desktops</h1>
  }
  </React.StrictMode>,
  document.getElementById('root')
);