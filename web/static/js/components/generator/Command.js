import React from 'react';

const COMMANDS = {
  spawnitem: ['name', 'amount', 'parameters'],
  spawntreasure: ['name', 'level'],
  spawnmonster: ['name', 'level', 'parameters'],
  spawnnpc: ['name'],
  spawnvehicle: ['name', 'parameters'],
  spawnstagehand: ['name', 'parameters'],
  spawnliquid: ['name', 'amount']
}

let _showCommand = (selectedCommand, selectedItem, jsonDiff, changes) => {
  let obj = {}
  jsonDiff.map((change) => {
    obj[change.key] = changes[change.key];
  })
  let amount = '';
  let params = ''

  switch (selectedCommand) {
    case 'spawnitem':
      amount = 1;
      break;
    case 'spawntreasure':
      amount = 1;
      break;
    case 'spawnmonster':
      amount = 1;
      break;
    case 'spawnliquid':
      amount = 1
      break;
  }
  let formattedObject = !$.isEmptyObject(obj) ? `'${JSON.stringify(obj)}'` : ''

  return(`/${selectedCommand} ${selectedItem} ${amount} ${formattedObject}`);
}

let _showDescription = (selectedCommand) => {
  let command = COMMANDS[selectedCommand];
  return (
    <code>{`/${selectedCommand} ${command.join(' ')}`}</code>
  )
}

const Command = (props) => {
  return (
    <div>
      <input
        readOnly
        className="form-control"
        onFocus={(e) => e.target.select()}
        value={_showCommand(props.selectedCommand, props.selectedItem, props.jsonDiff, props.changes)}
      />
        <p>Description:</p>
        {_showDescription(props.selectedCommand)}
    </div>
  )
}

export default Command;
