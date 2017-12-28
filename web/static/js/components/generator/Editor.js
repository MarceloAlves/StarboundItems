import React from "react";

const Editor = ({ onChange, itemJson }) => {
  return (
    <textarea
      className="form-control"
      name="item-json"
      rows="20"
      onChange={onChange}
      value={itemJson != undefined ? JSON.stringify(itemJson, null, 2) : ""}
    />
  );
};

export default Editor;
