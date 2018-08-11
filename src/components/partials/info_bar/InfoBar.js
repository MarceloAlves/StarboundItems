import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Panel from '../../common/panel/Panel'

class InfoBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column has-text-centered">
            <Panel>
              <p>There's a new tool called Generator beta which gives players an easy way to
                create a
                <code>/spawnitem</code>
                command. I'll be adding other commands if it ends up working out.</p>

              <p>If anyone has experience with parsing items and have ideas to update the
                database automatically, please reach out on&nbsp;
                <a
                  href="https://github.com/MarceloAlves/StarboundItems/"
                  target="_blank"
                  rel="noopener noreferrer">GitHub</a>.</p>

              <p>Donations:<br/>
                BTC - 18fGraHRaABSsggVjh48j38UUknxYmr7aR<br/>
                ETH - 0x18fD89d341f7C954DC4E3F48de1b075bd841F3Af<br/>
                LTC - LSobpEqayzcNKqopEieEM3tbEtpaH923pz</p>

            </Panel>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Panel title="What is this?">
              <p>This website allows you to search for items in the game Starbound. Using the
                <code>/spawnitem</code>
                command, you can generate an item in-game. Learn more about&nbsp;
                <a
                  href="http://starbounder.org/Commands"
                  target="_blank"
                  rel="noopener noreferrer">in-game commands.</a>
              </p>

              <p>Feel free to submit any feedback or suggestions on GitHub</p>
            </Panel>
          </div>
          <div className="column">
            <Panel title="What's changed recently?">
              <ul>
                <li>1.3 Items Added</li>
                <li>Added Generator<sup>beta</sup>.
                  <Link to="/generator">Try it out</Link>
                </li>
              </ul>
            </Panel>
          </div>
          <div className="column">
            <Panel title="How can I support this?">
              <p>This site is supported by ads to keep the server going.</p>

              <p>Donations are also accepted via</p>
              <div className="tags">
                <span className="tag is-danger">Bitcoin</span>
                <span className="tag is-info">Ethereum</span>
                <span className="tag is-warning">LiteCoin</span>
              </div>

              <p>If you'd like to contribute to the site please visit the&nbsp;
                <a
                  href="https://github.com/MarceloAlves/StarboundItems/"
                  target="_blank"
                  rel="noopener noreferrer">GitHub Repo</a>.</p>

              <p>I haven't spent a lot of time parsing new objects. Some help on a decent
                parsing script would be great. Get in touch in the GitHub issues. Thanks</p>
            </Panel>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InfoBar
