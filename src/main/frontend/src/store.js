import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    createLogger(),
    penderMiddleware()
];

const store = createStore(
    modules,
    composeEnhancers(applyMiddleware(...middlewares))
);

export default store;