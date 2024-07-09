import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Create a root instance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);