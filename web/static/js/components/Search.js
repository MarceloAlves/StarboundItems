import React, { Component } from "react";
import DebounceInput from "react-debounce-input";
import { connect } from "react-redux";
import ItemTable from "./ItemTable";

let actions = require("./../actions/index.js");

class Search extends Component {
  componentWillMount() {
    if (this.props.location.query.search != undefined) {
      this.performSearch(this.props.location.query.search);
    }
  }

  performSearch(value) {
    if (value.length > 2) {
      $.getJSON("/api/search/?type=list&term=" + value, results => {
        this.props.dispatch(actions.updateItems(results.data));
      });
    } else {
      this.props.dispatch(actions.updateItems([]));
    }
  }

  renderInfoRow() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="well">
              <p className="text-center">
                There's a new tool called{" "}
                <a href="/generator">
                  Generator{" "}
                  <sup>
                    <em>beta</em>
                  </sup>
                </a>{" "}
                which gives players an easy way to create a{" "}
                <code>/spawnitem</code> command. I'll be adding other commands
                if it ends up working out.
              </p>

              <p className="text-center">
                If anyone has experience with parsing items and have ideas to
                update the database automatically, please reach out on{" "}
                <a
                  href="https://github.com/marceloalves/starbounditems/issues"
                  target="_blank"
                >
                  GitHub
                </a>.
              </p>
              <div className="text-center">
                Donations:
                <ul className="list-unstyled">
                  <li>BTC - 18fGraHRaABSsggVjh48j38UUknxYmr7aR</li>
                  <li>ETH - 0x18fD89d341f7C954DC4E3F48de1b075bd841F3Af</li>
                  <li>LTC - LSobpEqayzcNKqopEieEM3tbEtpaH923pz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="well">
              <h4>What is this?</h4>
              <p>
                This website allows you to search for items in the game
                Starbound. Using the <code>/spawnitem</code> command, you can
                generate an item in-game. Learn more about{" "}
                <a href="http://starbounder.org/Commands" target="_blank">
                  in-game commands
                </a>.
              </p>
              <p>
                Feel free to submit any feedback or suggestions on{" "}
                <a
                  href="https://github.com/marceloalves/starbounditems/issues"
                  target="_blank"
                >
                  GitHub
                </a>.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="well">
              <h4>What's changed recently?</h4>
              <ul>
                <li>1.3 Items Added</li>
                <li>
                  Added Generator{" "}
                  <sup>
                    <em>beta</em>
                  </sup>. <a href="/generator">Try it out</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="well">
              <h4>How can I support this?</h4>
              <p>This site is supported by ads to keep the server going.</p>
              <p>
                Donations are also accepted via <br />
                <ul className="list-inline">
                  <li>
                    <span className="label label-primary">Bitcoin</span>
                  </li>
                  <li>
                    <span className="label label-info">Ethereum</span>
                  </li>
                  <li>
                    <span className="label label-warning">LiteCoin</span>
                  </li>
                </ul>
              </p>
              <p>
                If you'd like to contribute to the site please visit the{" "}
                <a href="https://github.com/MarceloAlves/StarboundItems">
                  GitHub Repo
                </a>.
              </p>
              <p>
                I haven't spent a lot of time parsing new objects. Some help on
                a decent parsing script would be great. Get in touch in the
                GitHub issues. Thanks
              </p>
            </div>
          </div>
        </div>
      </div>
    );
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
          this.renderInfoRow()
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
