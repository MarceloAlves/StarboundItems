import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getItemPage} from '../../../services/services'
import ItemTable from '../../common/item_table/ItemTable';

class ItemsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  async componentWillMount() {
    const {
      match: {
        params: {
          pageNumber
        }
      }
    } = this.props
    const {data} = await getItemPage(pageNumber)
    this.setState({
      ...data
    })
  }

  componentDidMount() {
    document.title = "All Items - Starbound Items"
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.pageNumber !== this.props.match.params.pageNumber) {
      const {data} = await getItemPage(this.props.match.params.pageNumber)
      this.setState({
        ...data
      })
    }
  }

  renderPagination() {
    const {totalPages} = this.state
    let pagination

    if (totalPages > 0) {
      const pageNumbers = [...Array(totalPages)]

      pagination = pageNumbers.map((pageNumber, index) => {
        const page = index + 1

        return (
          <li key={index}>
            <Link to={`/items/${page}`} className="pagination-link">{page}</Link>
          </li>
        )
      })
    }

    return pagination
  }

  render() {
    const {data} = this.state
    return (
      <div className="columns">
        <div className="column">
          {data.length > 0 && <ItemTable items={data}/>}
          <nav className="pagination is-centered" aria-label="pagination">
            <ul className="pagination-list">
              {this.renderPagination()}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default ItemsPage
