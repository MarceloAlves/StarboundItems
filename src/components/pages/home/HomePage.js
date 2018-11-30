import React, { useState, useEffect } from 'react'
import InfoBar from '../../partials/info_bar/InfoBar'
import classnames from 'classnames'
import { DebounceInput } from 'react-debounce-input'
import { performSearch } from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable'
import './HomePage.scss'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    document.title = 'Starbound Items'
  })

  const inputClassnames = classnames('control is-large', {
    'is-loading': isLoading
  })

  const handleSearch = async term => {
    setIsLoading(true)

    const results = await performSearch(term)
    setResults(results.data)
    setIsLoading(false)
  }

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
                onChange={e => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {results.length === 0 && <InfoBar />}
      <div className="columns">
        <div className="column">
          {results.length > 0 && <ItemTable items={results} />}
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage
