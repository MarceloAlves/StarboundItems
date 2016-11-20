var redux = require('redux');
var thunk = require('redux-thunk').default;
import {itemsReducer} from './../reducers/index.js'

export var configure = () => {
  var reducer = redux.combineReducers({
    items: itemsReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
