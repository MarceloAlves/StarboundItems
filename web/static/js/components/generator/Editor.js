import React from 'react';

const Editor = (props) => {
  return (
    <textarea
      className="form-control"
      name="item-json"
      rows="20"
      onChange={props.onChange}
      value={props.itemJson != undefined ? JSON.stringify(props.itemJson, null, 2) : ''}>
    </textarea>
  )
}

export default Editor;
