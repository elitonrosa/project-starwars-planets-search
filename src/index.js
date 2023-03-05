import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/Provider';

document.title = 'Star Wars Planets Search';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>,
);
