import React from 'react';
import Select from 'react-select';

const Search = (props) => {
  const _getOptions = (input, callback) => {
    setTimeout(() => {
      $.getJSON(`/api/search/?type=list&term=${input}`, (results) => {
        let resultsArray = [];
        results.data.map((result) => {
          let obj = {
            value: result.name,
            label: result.short_description,
            file: result.file
          }
          resultsArray.push(obj)
        })
        callback(null, { options: resultsArray });
      })
    }, 500)
  }

  return (
    <Select.Async
        name="item-selector"
        value={props.selectedItem}
        loadOptions={_getOptions}
        autoload={false}
        onChange={props.handleItemChange}
        clearable={true}
    />
  )
}

export default Search;
