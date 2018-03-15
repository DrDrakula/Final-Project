import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import root from './reducers/root'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

const store = createStore(root, applyMiddleware(thunk))
console.log(store)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
