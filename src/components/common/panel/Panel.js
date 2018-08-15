import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Panel extends Component {
  render() {
    const { title, children } = this.props

    return (
      <div className="box">
        <div className="content">
          <strong>{title}</strong>
          {children}
        </div>
      </div>
    )
  }
}

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default Panel
