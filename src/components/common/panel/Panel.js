import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Panel = ({ title, children }) => {
  return (
    <div className="box">
      <div className="content">
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default memo(Panel)
