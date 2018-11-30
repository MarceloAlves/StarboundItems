import React from 'react'
import PropTypes from 'prop-types'
import ItemRow from './ItemRow'

const ItemTable = ({ items }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Icon</th>
          <th>Item ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Rarity</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ItemRow key={item.name} {...item} />
        ))}
      </tbody>
    </table>
  )
}

ItemTable.defaultProps = {
  items: []
}

ItemTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
      short_description: PropTypes.string,
      description: PropTypes.string,
      rarity: PropTypes.string,
      type: PropTypes.string
    })
  )
}

export default ItemTable
