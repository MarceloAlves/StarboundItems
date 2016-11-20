// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Search from './components/Search';
import Tags from './components/Tags';
import ReactDOM from "react-dom";

var store = require('./store/configureStore.js').configure();

// Subscribe to changes
store.subscribe(() => {});

class Home extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Search />
        </Provider>
      </div>
    );
  }
}

class TagList extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Tags />
        </Provider>
      </div>
    );
  }
}

// This is gross
if (document.getElementById("home") != undefined) {
  ReactDOM.render(<Home/>, document.getElementById("home"))
} else if (document.getElementById("tags") != undefined) {
  ReactDOM.render(<TagList/>, document.getElementById("tags"))
}
