import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

class Navigation extends PureComponent {
  state = {
    navbarMenuOpened: false
  }

  handleBurgerClicked = () => {
    this.setState(state => ({
      navbarMenuOpened: !state.navbarMenuOpened
    }))
  }

  render() {
    const { navbarMenuOpened } = this.state
    const navbarMenuClasses = classnames('navbar-menu navbar-end', {
      'is-active': navbarMenuOpened
    })
    const burgerClasses = classnames('button is-small navbar-burger', {
      'is-active': navbarMenuOpened
    })
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            Starbound Items
          </NavLink>
          <button className={burgerClasses} onClick={this.handleBurgerClicked}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div className={navbarMenuClasses}>
          <NavLink
            to="/generator"
            activeClassName="is-active"
            className="navbar-item"
          >
            Generator
          </NavLink>
          <NavLink
            to="/items/1"
            activeClassName="is-active"
            className="navbar-item"
          >
            All Items
          </NavLink>
          <NavLink
            to="/colony-tags"
            activeClassName="is-active"
            className="navbar-item"
          >
            Colony Tags
          </NavLink>
          <NavLink
            to="/stats"
            activeClassName="is-active"
            className="navbar-item"
          >
            Stats
          </NavLink>
          <a
            className="navbar-item"
            href="https://github.com/MarceloAlves/StarboundItems/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feedback
          </a>
        </div>
      </nav>
    )
  }
}

export default Navigation
