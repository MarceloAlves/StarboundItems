import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdSense from 'react-adsense'
import HomePage from './components/pages/home/HomePage'
import Navigation from './components/partials/navigation/Navigation'
import GeneratorPage from './components/pages/generator/GeneratorPage'
import ColonyTagsPage from './components/pages/colony_tags/ColonyTagsPage'
import ItemsPage from './components/pages/items/ItemsPage'
import StatsPage from './components/pages/stats/StatsPage'
import Footer from './components/partials/footer/Footer'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />

        <div className="container main-content">
          <div className="columns">
            <div className="column has-text-centered">
              <AdSense.Google
                client="ca-pub-6016970971656505"
                slot="7016086730"
                format="auto"
              />
            </div>
          </div>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/generator" component={GeneratorPage} />
            <Route path="/colony-tags" component={ColonyTagsPage} />
            <Route path="/items/:pageNumber" component={ItemsPage} />
            <Route path="/stats" component={StatsPage} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
