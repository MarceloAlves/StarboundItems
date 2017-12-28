import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { itemsReducer } from "./../reducers/index.js";

export const configure = () => {
  var reducer = combineReducers({
    items: itemsReducer
  });

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
};
