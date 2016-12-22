import React from 'react';
import {connect} from 'react-redux';

const ItemRow = ({inventoryIcon, itemName, shortdescription, description, type, rarity}) => {
  let image = (path) => {
    let imagePath = `//d1uuiam3sukyri.cloudfront.net/images/${path}`

    return(
      <img src={imagePath} height="20" role="presentation" />
    )
  }
  return (
    <tr>
      <td>{inventoryIcon === null ? '' : image(inventoryIcon)}</td>
      <td>{itemName}</td>
      <td>{shortdescription}</td>
      <td>{description}</td>
      <td className={rarity != null ? rarity.toLowerCase() : null}><span className="item-rarity">{rarity}</span></td>
      <td><span className="item-type">{type}</span></td>
    </tr>
  )
}

export default connect()(ItemRow);
