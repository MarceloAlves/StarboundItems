import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Command = ({ selectedCommand, selectedItem, jsonDiff, changes }) => {
  const COMMANDS = {
    spawnitem: ['name', 'amount', 'parameters'],
    spawntreasure: ['name', 'level'],
    spawnmonster: ['name', 'level', 'parameters'],
    spawnnpc: ['name'],
    spawnvehicle: ['name', 'parameters'],
    spawnstagehand: ['name', 'parameters'],
    spawnliquid: ['name', 'amount']
  }

  const showCommand = (selectedCommand, selectedItem, jsonDiff, changes) => {
    let obj = {}
    jsonDiff.forEach(change => (obj[change.key] = changes[change.key]))

    let formattedObject = !_.isEmpty(obj) ? `'${JSON.stringify(obj)}'` : ''

    return `/${selectedCommand} ${selectedItem} 1 ${formattedObject}`
  }

  const showDescription = selectedCommand => {
    const command = COMMANDS[selectedCommand]
    return <code>{`/${selectedCommand} ${command.join(' ')}`}</code>
  }

  return (
    <div className="field">
      <div className="control">
        <input
          readOnly
          className="input is-primary"
          onFocus={e => e.target.select()}
          value={showCommand(selectedCommand, selectedItem, jsonDiff, changes)}
        />
        <p>Description:</p>
        {showDescription(selectedCommand)}
      </div>
    </div>
  )
}

Command.propTypes = {
  selectedCommand: PropTypes.string,
  selectedItem: PropTypes.string,
  jsonDiff: PropTypes.array,
  changes: PropTypes.object
}

export default Command
