import React from 'react'
import Card from '../util/View/Card'
import {PageTitle} from '../util/View/Title'
import {Meta} from '../util/View/Meta'
import FeatureList from '../Feature/List'
import Dependencies from './Dependencies'

const ComponentDetails = ({component}) => <Dependencies component={component} />

const Component = ({prefix, component}) => {
  const title = <div>
    <PageTitle>{component.name}</PageTitle>
    <Meta>{component.Component.__PIGMENT_META.file}</Meta>
  </div>

  return <div>
    <Card id='component' title={title} closable defaultClosed>
      <ComponentDetails component={component} />
    </Card>

    <FeatureList component={component} prefix={prefix} />
  </div>
}

export default ({prefix, component}) => class extends React.Component {
  constructor () {
    super()
    document.title = `${component.name}`
  }

  scrollIfNeeded () {
    const featureName = this.props.params.featureName
    if (featureName && this.featureName !== featureName) {
      document.getElementById(featureName).scrollIntoView()
      this.featureName = featureName
    }
  }

  componentDidMount () {
    this.scrollIfNeeded()
  }

  componentDidUpdate () {
    this.scrollIfNeeded()
  }

  render () {
    return <Component {...this.props} prefix={prefix} component={component} />
  }
}
