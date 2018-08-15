import React from 'react'
import PropTypes from 'prop-types'

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
        {items.map(item => {
          return (
            <tr key={item.name}>
              <td>
                {item.icon !== null ? (
                  <img
                    src={process.env.PUBLIC_URL + '/images/icons/' + item.icon}
                    alt={item.short_description}
                  />
                ) : null}
              </td>
              <td>{item.name}</td>
              <td>{item.short_description}</td>
              <td>{item.description}</td>
              <td>{item.rarity}</td>
              <td>{item.type}</td>
            </tr>
          )
        })}
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
