import React from 'react';
import {connect} from 'react-redux';

const ItemRow = ({id, inventoryIcon, itemName, shortdescription, description, type, rarity}) => {
  let image = (path) => {
    let imagePath = `/images/${path}`

    return(
      <img src={imagePath} height="20" role="presentation" />
    )
  }
  return (
    <tr>
      <td>{inventoryIcon === null ? '' : image(inventoryIcon)}</td>
      <td>
        <button className="btn btn-xs btn-default clipboard-button" data-toggle="popover" data-placement="top" title="Copied!" data-clipboard-target={`#item-${id}`}>
          <i className="fa fa-clipboard"></i>
        </button>
        &nbsp;<span id={`item-${id}`}>{itemName}</span>
      </td>
      <td>{shortdescription}</td>
      <td>{description}</td>
      <td className={rarity != null ? rarity.toLowerCase() : null}><span className="item-rarity">{rarity}</span></td>
      <td><span className="item-type">{type}</span></td>
    </tr>
  )
}

export default connect()(ItemRow);
