import React from 'react';
import {connect} from 'react-redux';

const ItemRow = ({index, icon, name, short_description, description, type, rarity}) => {
  let image = (path) => {
    let imagePath = `/images/icons/${path}`

    return(
      <img src={imagePath} height="20" role="presentation" />
    )
  }
  return (
    <tr>
      <td>{icon === null ? '' : image(icon)}</td>
      <td>
        <button className="btn btn-xs btn-default clipboard-button" data-toggle="popover" data-placement="top" data-clipboard-target={`#item-${index}`}>
          <i className="fa fa-clipboard"></i>
        </button>
        &nbsp;<span id={`item-${index}`}>{name}</span>
      </td>
      <td>{short_description}</td>
      <td>{description}</td>
      <td className={rarity != null ? rarity.toLowerCase() : null}><span className="item-rarity">{rarity}</span></td>
      <td><span className="item-type">{type}</span></td>
    </tr>
  )
}

export default connect()(ItemRow);
