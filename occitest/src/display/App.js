import React from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import {compose, withProps, withState} from 'recompose'

import Suite from './Suite'

const AppPage = (suites) => compose(
  withProps({suites}),
  withState('viewport', 'setViewport', { height: 'auto', width: 'auto'})
)((props) => <div>
  <nav>
    {props.suites.map((suite) => <Link key={suite.name} to={suite.name}>{suite.name}</Link>)}

    <button onClick={() => props.setViewport({height: '800px', width: '300px', margin: '0 auto'})}>Mobile</button>
    <button onClick={() => props.setViewport({height: 'auto', width: 'auto'})}>Desktop</button>
  </nav>
  <section style={props.viewport}>
    {props.children}
  </section>
</div>)

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
