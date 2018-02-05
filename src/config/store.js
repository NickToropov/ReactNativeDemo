import * as storage from 'redux-storage'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import * as reducers from '../reducers/index';

const reducer = storage.reducer(combineReducers(reducers));
const engine = createEngine('my-save-key');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));


export default store;