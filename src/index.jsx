import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <App name="hello" age={12} />
  </React.StrictMode>,
  document.querySelector('#root'),
);
