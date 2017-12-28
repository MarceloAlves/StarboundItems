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
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import React, { Component } from "react";
import { Provider } from "react-redux";
import Search from "./components/Search";
import Tags from "./components/Tags";
import Generator from "./components/Generator";
import ReactDOM from "react-dom";
import Clipboard from "clipboard";
import { Router, Route, browserHistory } from "react-router";

let store = require("./store/configureStore.js").configure();

let actions = require("./actions/index.js");

// Subscribe to changes
store.subscribe(() => {});

// Initialize clipboard
let clipboard = new Clipboard(".clipboard-button");

clipboard.on("success", function(e) {
  if (typeof ga != undefined) {
    ga("send", "event", "Clipboard", "copy");
  }
  e.clearSelection();
  $(e.trigger).attr("title", "Copied!");
  $(e.trigger).popover("toggle");
  setTimeout(() => {
    $(e.trigger).popover("toggle");
  }, 2000);
});

clipboard.on("error", function(e) {
  $(e.trigger).attr("title", "CTRL + C to Copy");
  $(e.trigger).popover("toggle");
  setTimeout(() => {
    $(e.trigger).popover("toggle");
  }, 2000);
});

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Search} />
            <Route path="/tags" component={Tags} />
            <Route path="/generator" component={Generator} />
          </Router>
        </Provider>
      </div>
    );
  }
}

if (document.getElementById("app-container") != undefined) {
  ReactDOM.render(<App />, document.getElementById("app-container"));
}
