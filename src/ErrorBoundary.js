import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <div />
    }

    return children
  }
}

export default ErrorBoundary
