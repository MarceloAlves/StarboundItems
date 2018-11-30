import React, { PureComponent } from 'react'
import { TAGS } from '../../../resources/constants'
import { tagLookup } from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable'
import './ColonyTagsPage.scss'

class ColonyTagsPage extends PureComponent {
  state = {
    tags: []
  }

  componentDidMount = () => {
    document.title = 'Colony Tags - Starbound Items'
  }

  handleSelect = event => {
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
