import React, {Component} from 'react'

class Panel extends Component {
  render() {
    const {title, children} = this.props

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

export default Panel
