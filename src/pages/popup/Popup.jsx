import React from 'react';
import logo from '../../assets/img/logo.svg';
import { retrieveToken } from '../../common/helpers';
import { getConfiguration } from '../../common/interface';
import './Popup.css';

chrome.storage.local.get(['nodraft-extension-token'], function(result) {
    console.log('Value currently is ' + result.key);
  });

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Popup;
