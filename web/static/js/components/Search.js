import React from 'react';
import DebounceInput from 'react-debounce-input';
import {connect} from 'react-redux';
import ItemTable from './ItemTable';

var actions = require('./../actions/index.js');

const Search = (props) => {
  let performSearch = (value) => {
    if(value.length > 2) {
      $.getJSON('/api/search/?type=list&term=' + value, (results) => {
        props.dispatch(actions.updateItems(results.data))
      })
    } else {
      props.dispatch(actions.updateItems([]))
    }
  }

  let renderInfoRow = () => (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="well bg-danger text-center">
            <p>Hey there! I'm trying to decide on what to do next with this site. If you have a few minutes and wouldn't mind filling out a survey
            it would be super helpful. <br /><a href="https://docs.google.com/forms/d/e/1FAIpQLScNGkSFEJgt6tZxc6jUli72WUNg3VxMwTaYqAk4r5KMt2vvYw/viewform" target="_blank">Head on over to this link.</a><br />Thanks!</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="well">
            <h4>What is this?</h4>
            <p>This website allows you to search for items in the game Starbound. Using the <code>/spawnitem</code> command, you can generate an item in-game. Learn more about <a href="http://starbounder.org/Commands" target="_blank">in-game commands</a>.</p>
            <p>Feel free to submit any feedback or suggestions on <a href="https://github.com/marceloalves/starbounditems/issues" target="_blank">Github</a>.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="well">
            <h4>What's changed recently?</h4>
            <ul>
              <li>1.0 Items Added</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="well">
            <h4>How can I support this?</h4>
            <p>This site is supported by ads to keep the server going. If you'd like to contribute to the site please visit the <a href="https://github.com/MarceloAlves/StarboundItems">GitHub Repo</a>.</p>
            <p>I haven't spent a lot of time parsing new objects. Some help on a decent parsing script would be great. Get in touch in the GitHub issues. Thanks</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="well well-sm">
        <div className="col-md-12">
          <DebounceInput
            debounceTimeout={300}
            onChange={event => performSearch(event.target.value) }
            placeholder="Start Typing... (Examples: dirtmaterial, tomatojuice, sandstonetorch)"
            className="form-control input-lg" />
        </div>
        <div className="clearfix"></div>
      </div>

      {props.items.length > 0 ? <ItemTable items={props.items} /> : renderInfoRow()}
    </div>
  )
}

export default connect(
  (state) => {
    return {
      items: state.items
    };
  }
)(Search);
