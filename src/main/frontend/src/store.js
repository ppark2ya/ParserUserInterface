import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(modules, composeEnhancers(applyMiddleware(logger, penderMiddleware)));

export default store;