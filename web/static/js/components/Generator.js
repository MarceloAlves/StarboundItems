import React, { Component } from 'react';
import changesets from 'diff-json';
import Select from 'react-select';

import Search from './generator/Search';
import Editor from './generator/Editor';
import Command from './generator/Command';

class Generator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      itemJson: undefined,
      selectedCommand: undefined,
      originalJson: undefined,
      jsonDiff: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCommandChange = this.handleCommandChange.bind(this);
  }

  componentDidMount() {
    // $.getJSON('http://localhost:4000/json/aviancommoner.json', (results) => {
    //   this.setState({ itemJson: results });
    //   this.setState({ originalJson: results });
    // })
  }

  _getJSON(value) {
    $.getJSON(`/json/${value}`, (results) => {
      this.setState({ itemJson: results, originalJson: results });
    })
  }

  handleChange(event) {
    let originalJson = this.state.originalJson;
    let changes = JSON.parse(event.target.value);
    let jsonDiff = changesets.diff(originalJson, changes);

    this.setState({
      changes: changes,
      itemJson: JSON.parse(event.target.value, null, 2),
      jsonDiff: jsonDiff
    })
  }

  handleItemChange(event) {
    this.setState({ selectedItem: event.value });
    this._getJSON(event.file);
  }

  handleCommandChange(event) {
    this.setState({ selectedCommand: event.target.value });
  }

  render() {
    return(
        <div>
            <div className="row">
              <div className="col-md-6">
                <select className="form-control" defaultValue="" onChange={this.handleCommandChange}>
                  <option value="" disabled>Select Command</option>
                  <option value="spawnitem">/spawnitem</option>
                  <option value="spawnmonster">/spawnmonster</option>
                  <option value="spawnnpc">/spawnnpc</option>
                  <option value="spawnvehicle">/spawnvehicle</option>
                  <option value="spawntreasure">/spawntreasure</option>
                  <option value="spawnstagehand">/spawnstagehand</option>
                  <option value="spawnliquid">/spawnliquid</option>
                </select>
              </div>
              <div className="col-md-6">
                { this.state.selectedCommand != undefined ? <Search selectedItem={this.state.selectedItem} handleItemChange={this.handleItemChange}  /> : undefined }
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                { this.state.itemJson != undefined ? <Editor itemJson={this.state.itemJson} onChange={this.handleChange} /> : undefined }
              </div>
              <div className="col-md-6">
                { this.state.itemJson != undefined ? <Command changes={this.state.changes} jsonDiff={this.state.jsonDiff} selectedCommand={this.state.selectedCommand} selectedItem={this.state.selectedItem} /> : undefined }
              </div>
            </div>
        </div>
      )
  }
}

export default Generator;
