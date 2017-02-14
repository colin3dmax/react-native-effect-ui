/**
 * Created by Colin3dmax on 16/12/26.
 */
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
var {AsyncStorage} = require('react-native');

import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/index';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
var createTaoStore = applyMiddleware(thunk)(createStore);

export default function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createTaoStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
