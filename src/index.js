import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
 import { applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createLogger} from 'redux-logger'
import {thunk} from 'redux-thunk'
// import compose

// const alwaysReturnHelloMiddleware = storeAPI => next => action => {
//     const originalResult = next(action)
//     // Ignore the original result, return something else
//     return 'Hello!'
//   }

const redux = require('redux');
// const middlewareEnhancer = redux.applyMiddleware(alwaysReturnHelloMiddleware)
// const thunkMiddelware = require('redux-thunk').default; 
const logger = createLogger({});
const store = redux.createStore(rootReducer, applyMiddleware(thunk, logger))
// const axios = require('axiso');


ReactDOM.render(
<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export {loadAllTodosFunction} from './reducers/todoReducer'    
export {addTodoItem} from './reducers/todoReducer'      
