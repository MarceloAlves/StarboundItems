import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './ItemRow.scss'

const ItemRow = ({
  icon,
  short_description,
  name,
  description,
  rarity,
  type
}) => {
  return (
    <tr className="item-row">
      <td>
        {icon !== null ? (
          <img
            src={process.env.PUBLIC_URL + '/images/icons/' + icon}
            alt={short_description}
          />
        ) : null}
      </td>
      <td>{name}</td>
      <td>{short_description}</td>
      <td>{description}</td>
      <td>{rarity}</td>
      <td>{type}</td>
    </tr>
  )
}

ItemRow.propTypes = {
  icon: PropTypes.string,
  short_description: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  rarity: PropTypes.string,
  type: PropTypes.string
}

export default memo(ItemRow)
