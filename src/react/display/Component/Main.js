import React from 'react'
import {Match} from 'react-router'
import CurrentComponent from './Current'
import Feature from '../Feature/Main'

const Component = ({component, pathname}) => {
  return <div>
    <Match
      exactly
      pattern={`${pathname}`}
      render={({pathname}) => <CurrentComponent component={component} pathname={pathname} />}
    />
    <Match
      pattern={`${pathname}/:featureName`}
      render={({pathname, params}) => {
        const featureName = params.featureName
        const feature = component.features.find((feature) => feature.name === featureName)
        return <Feature feature={feature} component={component} pathname={pathname} />
      }}
    />
  </div>
}

export default Component
