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
import { ActionCableProvider } from 'react-actioncable-provider'


const store = createStore(root, applyMiddleware(thunk))
console.log(store)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ActionCableProvider url='ws://localhost:3000/cable'>
          <App />
        </ActionCableProvider>
      </BrowserRouter>
    </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
