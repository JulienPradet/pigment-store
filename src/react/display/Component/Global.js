import React from 'react'
import {Link} from 'react-router'
import Card from '../util/View/Card'
import {PageTitle} from '../util/View/Title'
import {Meta} from '../util/View/Meta'
import FeatureList from '../Feature/List'
import {makePath} from '../router'

const makeLinkFromDependency = ({suiteName, componentName}) => {
  return makePath(suiteName, componentName)
}

const ComponentDetails = ({component}) => <div>
  <div>File: {component.Component.__PIGMENT_META.file}</div>
  <div>
    <span>Dependencies</span>
    <ul>
      {component.Component.__PIGMENT_META.resolvedDependencies
        ? component.Component.__PIGMENT_META.resolvedDependencies.map((dependency, index) => <li key={index}>
          <Link to={makeLinkFromDependency(dependency)}>{dependency.componentName}</Link>
        </li>)
        : null}
    </ul>
  </div>
</div>

const Component = ({suiteName, name, component}) => {
  const title = <div>
    <PageTitle>{name}</PageTitle>
    <Meta>{component.Component.__PIGMENT_META.file}</Meta>
  </div>

  return <div>
    <Card title={title} closable defaultClosed>
      <ComponentDetails component={component} />
    </Card>

    <FeatureList component={component} componentName={name} suiteName={suiteName} />
  </div>
}

export default (suiteName, componentName, component) => class extends React.Component {
  constructor () {
    super()
    document.title = `${suiteName} | ${componentName}`
  }

  render () {
    return <Component {...this.props} suiteName={suiteName} name={componentName} component={component} />
  }
}
