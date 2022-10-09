import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/main.css';
import './css/tailwind.css';
import App from './App';


//Redux set up
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ store }>
        <App />
    </Provider>
 
);


