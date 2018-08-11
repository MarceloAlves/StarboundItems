import React, {Component} from 'react'
import InfoBar from '../../partials/info_bar/InfoBar'
import classnames from 'classnames'
import {DebounceInput} from 'react-debounce-input'
import {performSearch} from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable'
import './HomePage.css'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      error: false
    }

    this.handleSearch = this
      .handleSearch
      .bind(this)
  }

  componentDidMount() {
    document.title = "Starbound Items"
  }

  handleSearch(term) {
    this.setState({isLoading: true})
    const results = performSearch(term);
    results.then(response => this.setState({results: response.data.data, isLoading: false}))
  }

  render() {
    const {isLoading, results} = this.state
    const inputClassnames = classnames("control is-large", {"is-loading": isLoading})

    return (
      <React.Fragment>
        <div className="columns search">
          <div className="column has-text-centered">
            <div className="field">
              <div className={inputClassnames}>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  className="input is-large"
                  type="text"
                  placeholder="Start Typing... (Examples: dirtmaterial, tomatojuice, sandstonetorch)"
                  onChange={(e) => this.handleSearch(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
        {results.length === 0 && <InfoBar/>}
        <div className="columns">
          <div className="column">
            {results.length > 0 && <ItemTable items={results}/>}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default HomePage
