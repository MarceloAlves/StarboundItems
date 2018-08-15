import React, { Component } from 'react'
import { TAGS } from '../../../resources/constants'
import { tagLookup } from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable'
import './ColonyTagsPage.css'

class ColonyTagsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    document.title = 'Colony Tags - Starbound Items'
  }

  handleSelect(event) {
    const results = tagLookup(event.target.value)
    results.then(response => this.setState({ tags: response.data }))
  }

  render() {
    const { tags } = this.state

    return (
      <React.Fragment>
        <div className="columns">
          <div className="column has-text-centered">
            <div className="field">
              <div className="control is-large">
                <div className="select is-large">
                  <select className="max-width" onChange={this.handleSelect}>
                    <option>Select Tag</option>
                    {TAGS.map(tag => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {tags.length > 0 && <ItemTable items={tags} />}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ColonyTagsPage
