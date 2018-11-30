import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getItemPage } from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable'

class ItemsPage extends PureComponent {
  state = {
    data: [],
    totalPages: 0
  }

  componentWillMount = async () => {
    const {
      match: {
        params: { pageNumber }
      }
    } = this.props
    const { data, totalPages } = await getItemPage(pageNumber)
    this.setState({ data, totalPages })
  }

  componentDidMount = () => {
    document.title = 'All Items - Starbound Items'
  }

  componentDidUpdate = async prevProps => {
    if (
      prevProps.match.params.pageNumber !== this.props.match.params.pageNumber
    ) {
      const { data, totalPages } = await getItemPage(
        this.props.match.params.pageNumber
      )
      this.setState({ data, totalPages })
    }
  }

  renderPagination = () => {
    const { totalPages } = this.state
    let pagination

    if (totalPages > 0) {
      const pageNumbers = [...Array(totalPages)]

      pagination = pageNumbers.map((pageNumber, index) => {
        const page = index + 1

        return (
          <li key={index}>
            <Link to={`/items/${page}`} className="pagination-link">
              {page}
            </Link>
          </li>
        )
      })
    }

    return pagination
  }

  render() {
    const { data } = this.state
    return (
      <div className="columns">
        <div className="column">
          {data.length > 0 && <ItemTable items={data} />}
          <nav className="pagination is-centered" aria-label="pagination">
            <ul className="pagination-list">{this.renderPagination()}</ul>
          </nav>
        </div>
      </div>
    )
  }
}

ItemsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageNumber: PropTypes.string
    })
  })
}

export default ItemsPage
