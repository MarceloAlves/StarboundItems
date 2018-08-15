import React from "react";

const InfoPanels = props => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <div className="well">
          <p className="text-center">
            Hey there! I've been working on V3 of Starbound Items. If you'd like to check it out head over to <a href="https://starbounditems.com">https://starbounditems.com</a>.
             So far most of the same functionality exists, its just a technology stack change for now.</p>
             
             <p className="text-center">Feel free to help out or report any issues on the &nbsp;
              <a
                href="https://github.com/marceloalves/starbounditems/issues"
                target="_blank"
              >
                GitHub Repo
              </a>
            </p>

          <div className="text-center">
            Donations:
            <ul className="list-unstyled">
              <li>BTC - 18fGraHRaABSsggVjh48j38UUknxYmr7aR</li>
              <li>ETH - 0x18fD89d341f7C954DC4E3F48de1b075bd841F3Af</li>
              <li>LTC - LSobpEqayzcNKqopEieEM3tbEtpaH923pz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <div className="well">
          <h4>What is this?</h4>
          <p>
            This website allows you to search for items in the game Starbound.
            Using the <code>/spawnitem</code> command, you can generate an item
            in-game. Learn more about{" "}
            <a href="http://starbounder.org/Commands" target="_blank">
              in-game commands
            </a>.
          </p>
          <p>
            Feel free to submit any feedback or suggestions on{" "}
            <a
              href="https://github.com/marceloalves/starbounditems/issues"
              target="_blank"
            >
              GitHub
            </a>.
          </p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="well">
          <h4>What's changed recently?</h4>
          <ul>
            <li>1.3 Items Added</li>
            <li>
              Added Generator{" "}
              <sup>
                <em>beta</em>
              </sup>. <a href="/generator">Try it out</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-4">
        <div className="well">
          <h4>How can I support this?</h4>
          <p>This site is supported by ads to keep the server going.</p>
          <p>Donations are also accepted via</p>
          <ul className="list-inline">
            <li>
              <span className="label label-primary">Bitcoin</span>
            </li>
            <li>
              <span className="label label-info">Ethereum</span>
            </li>
            <li>
              <span className="label label-warning">LiteCoin</span>
            </li>
          </ul>
          <p>
            If you'd like to contribute to the site please visit the{" "}
            <a href="https://github.com/MarceloAlves/StarboundItems">
              GitHub Repo
            </a>.
          </p>
          <p>
            I haven't spent a lot of time parsing new objects. Some help on a
            decent parsing script would be great. Get in touch in the GitHub
            issues. Thanks
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default InfoPanels;
