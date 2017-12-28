import React, { Component } from "react";
import DebounceInput from "react-debounce-input";
import { connect } from "react-redux";

import ItemTable from "./ItemTable";
import InfoPanels from "./Home/InfoPanels";

let actions = require("./../actions/index.js");

class Search extends Component {
  componentWillMount() {
    if (this.props.location.query.search != undefined) {
      this.performSearch(this.props.location.query.search);
    }
  }

  performSearch(value) {
    if (value.length > 2) {
      if (typeof ga != undefined) {
        ga("send", "event", "Home", "search");
      }
      $.getJSON("/api/search/?type=list&term=" + value, results => {
        this.props.dispatch(actions.updateItems(results.data));
      });
    } else {
      this.props.dispatch(actions.updateItems([]));
    }
  }

  renderInfoRow() {
    return null;
  }

  render() {
    return (
      <div>
        <div className="well well-sm">
          <div className="col-md-12">
            <DebounceInput
              debounceTimeout={300}
              onChange={event => this.performSearch(event.target.value)}
              placeholder="Start Typing... (Examples: dirtmaterial, tomatojuice, sandstonetorch)"
              className="form-control input-lg"
            />
          </div>
          <div className="clearfix" />
        </div>
        {this.props.items.length > 0 ? (
          <ItemTable items={this.props.items} />
        ) : (
          <InfoPanels />
        )}
      </div>
    );
  }
}

export default connect(state => {
  return {
    items: state.items
  };
})(Search);
