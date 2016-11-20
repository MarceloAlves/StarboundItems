import React from 'react';
import {connect} from 'react-redux';
import ItemRow from './ItemRow';

const ItemTable = (props) => {
  let renderItemRows = () => {
    let {items} = props;

    if(items.length > 0){
      return items.map((item, index) => {
        return (
          <ItemRow key={index} {...item} />
        )
      })
    }
  }

  return (
    <table className="table table-striped table-bordered">
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
        {renderItemRows()}
      </tbody>
    </table>
  )
}

export default connect()(ItemTable);
