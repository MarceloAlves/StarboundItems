import React, { Component, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdSense from 'react-adsense'
import HomePage from './components/pages/home/HomePage'
import Navigation from './components/partials/navigation/Navigation'
import Footer from './components/partials/footer/Footer'
import ErrorBoundary from './ErrorBoundary'

const GeneratorPage = lazy(() =>
  import('./components/pages/generator/GeneratorPage')
)

const ColonyTagsPage = lazy(() =>
  import('./components/pages/colony_tags/ColonyTagsPage')
)
const ItemsPage = lazy(() => import('./components/pages/items/ItemsPage'))
const StatsPage = lazy(() => import('./components/pages/stats/StatsPage'))

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="container main-content">
          <div className="columns">
            <div className="column has-text-centered">
              <ErrorBoundary>
                <AdSense.Google
                  client="ca-pub-6016970971656505"
                  slot="7016086730"
                  format="auto"
                />
              </ErrorBoundary>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                path="/generator"
                component={props => <GeneratorPage {...props} />}
              />
              <Route
                path="/colony-tags"
                component={props => <ColonyTagsPage {...props} />}
              />
              <Route
                path="/items/:pageNumber"
                component={props => <ItemsPage {...props} />}
              />
              <Route
                path="/stats"
                component={props => <StatsPage {...props} />}
              />
            </Switch>
          </Suspense>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
