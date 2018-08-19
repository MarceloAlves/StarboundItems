import React, { Component } from 'react'
import Select from 'react-select'
import ReactJson from 'react-json-view'
import changesets from 'diff-json'
import 'react-select/dist/react-select.css'
import debounce from 'lodash/debounce'
import { performSearch } from '../../../services/services'
import Command from './Command'

class GeneratorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: null,
      originalJson: null,
      itemJson: null,
      selectedCommand: null,
      jsonDiff: []
    }

    this.searchOptions = debounce(this.searchOptions, 500)
    this.handleCommandChange = this.handleCommandChange.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
    this.handleJsonChange = this.handleJsonChange.bind(this)
  }
  componentDidMount() {
    document.title = 'Generator - Starbound Items'
  }

  async searchOptions(input, callback) {
    let searchResults = []
    const results = await performSearch(input, true)
    if (results.data && results.data.length > 0) {
      searchResults = results.data.map(result => ({
        value: result.name,
        label: result.short_description,
        originalJson: result.raw
      }))
    }
    callback(null, { options: searchResults })
  }

  handleItemChange(e) {
    if (e !== null) {
      this.setState({
        selectedItem: e.value,
        jsonDiff: [],
        itemJson: e.originalJson,
        originalJson: e.originalJson
      })
    } else {
      this.setState({
        selectedItem: null,
        originalJson: null,
        itemJson: null,
        jsonDiff:[]
      })
    }
  }

  handleCommandChange(e) {
    this.setState({ selectedCommand: e.target.value })
  }

  handleJsonChange(e) {
    const { originalJson } = this.state
    const changes = e.updated_src
    const jsonDiff = changesets.diff(originalJson, changes)

    this.setState({ itemJson: e.updated_src, jsonDiff })
  }

  render() {
    const { selectedItem, itemJson, selectedCommand, jsonDiff } = this.state

    return (
      <React.Fragment>
        <div className="columns">
          <div className="column">
            <p>
              Pick a command (so far only
              <code>/spawnitem</code>
              is available), then search for an item and select one.
            </p>
            <p>
              A text box with the original JSON will appear on the left. The
              right will be a text box with the command to spawn that item.
              Changes made to the JSON will update the command. Hopefully it
              works.
            </p>
            <p>
              It's under development and there could be issues. If you run into
              issues or have some feedback, please use this&nbsp;
              <a href="https://goo.gl/forms/XH6UyKXGcXjzXKJI3">form</a>
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="generator select">
              <select defaultValue="" onChange={this.handleCommandChange}>
                <option value="" disabled>
                  Select Command
                </option>
                <option value="spawnitem">/spawnitem</option>
              </select>
            </div>
          </div>
          <div className="column">
            {selectedCommand && (
              <Select.Async
                name="item-selector"
                value={selectedItem}
                loadOptions={this.searchOptions}
                autoload={false}
                onChange={this.handleItemChange}
                clearable={true}
              />
            )}
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {itemJson && (
              <ReactJson
                src={itemJson}
                onEdit={this.handleJsonChange}
                displayDataTypes={false}
                theme={'bright:inverted'}
                displayObjectSize={false}
                collapsed={1}
                onAdd={this.handleJsonChange}
                style={{
                  marginBottom: '50px'
                }}
              />
            )}
          </div>
          <div className="column">
            {this.state.itemJson && (
              <Command
                changes={itemJson}
                jsonDiff={jsonDiff}
                selectedCommand={selectedCommand}
                selectedItem={selectedItem}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default GeneratorPage
