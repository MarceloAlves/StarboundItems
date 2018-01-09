import React from "react";
import ReactJson from "react-json-view";

const Editor = ({ onChange, itemJson }) => {
  return (
    <ReactJson
      src={itemJson}
      onEdit={onChange}
      displayDataTypes={false}
      theme={"bright:inverted"}
      displayDataTypes={false}
      displayObjectSize={false}
      collapsed={1}
      onAdd={onChange}
      style={{ marginBottom: "50px" }}
    />
  );
};

export default Editor;
