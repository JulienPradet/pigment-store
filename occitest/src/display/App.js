import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import Suite from './Suite'

const AppPage = (suites) => (props) => {
  return <div>
    <nav>
      {suites.map((suite) => <Link key={suite.name} to={suite.name}>{suite.name}</Link>)}
    </nav>
    <section>
      {props.children}
    </section>
  </div>
}

const Home = (props) => <div>
  Hi there
</div>

const App = ({suites}) => {
  const SuiteRoutes = suites.map((suite) => <Route key={suite.name} path={suite.name} component={Suite(suite)} />)

  return <Router history={browserHistory}>
    <Route path="/" component={AppPage(suites)}>
      <IndexRoute component={Home} />
      {SuiteRoutes}
    </Route>
  </Router>
}

export default App
