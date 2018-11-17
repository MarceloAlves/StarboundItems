import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Panel from '../../common/panel/Panel'

class InfoBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column">
            <Panel title="What is this?">
              <p>
                This website allows you to search for items in the game
                Starbound. Using the
                <code>/spawnitem</code>
                command, you can generate an item in-game. Learn more
                about&nbsp;
                <a
                  href="http://starbounder.org/Commands"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  in-game commands.
                </a>
              </p>

              <p>
                Feel free to submit any feedback or suggestions on{' '}
                <a
                  href="https://github.com/MarceloAlves/StarboundItems/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </a>
              </p>
            </Panel>
          </div>
          <div className="column">
            <Panel title="What's changed recently?">
              <ul>
                <li>1.3 Items Added</li>
                <li>
                  Added Generator
                  <sup>beta</sup>.<Link to="/generator">Try it out</Link>
                </li>
              </ul>
            </Panel>
          </div>
          <div className="column">
            <Panel title="How can I support this?">
              <p>This site is supported by ads to keep the server going.</p>

              <p>
                Enjoy the site and want to say thanks?{' '}
                <a
                  href="https://www.buymeacoffee.com/celo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                    alt="Buy Me A Coffee"
                    style={{
                      height: 'auto !important',
                      width: 'auto !important',
                      marginTop: '10px'
                    }}
                  />
                </a>
              </p>

              <p>
                If you'd like to contribute to the site please visit the&nbsp;
                <a
                  href="https://github.com/MarceloAlves/StarboundItems/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </a>
                .
              </p>

              <p>
                I haven't spent a lot of time parsing new objects. Some help on
                a decent parsing script would be great. Get in touch in the
                GitHub issues. Thanks
              </p>
            </Panel>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InfoBar
