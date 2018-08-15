import React, { Component } from 'react'
import { getStats } from '../../../services/services'
import classNames from 'classnames'
import numeral from 'numeral'
import './StatsPage.css'

class StatsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexCount: 0,
      searchTerms: [],
      searchCount: 0
    }
  }

  async componentWillMount() {
    const { data } = await getStats()
    this.setState({
      ...data
    })
  }

  componentDidMount() {
    document.title = 'Stats - Starbound Items'
  }

  render() {
    const { indexCount, searchTerms, searchCount } = this.state
    return (
      <div className="columns">
        <div className="column">
          <div className="content has-text-centered">
            <h3>Top 10 Searches</h3>
            <div className="has-text-left">
              <ul className="list-unstyled">
                {searchTerms.length > 0 &&
                  searchTerms.map((result, index) => {
                    const classes = classNames('tag', {
                      'is-light': index > 0,
                      'is-success': index === 0
                    })
                    return (
                      <li key={index}>
                        <span className={classes}>{result.count}</span>
                        {result.term}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="column has-text-centered">
          <div className="content">
            <h3>Total Searches</h3>
            <p>{numeral(searchCount).format('0,0')}</p>
          </div>
        </div>
        <div className="column has-text-centered">
          <div className="content">
            <h3>Stable Items</h3>
            <p>{numeral(indexCount).format('0,0')}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StatsPage
