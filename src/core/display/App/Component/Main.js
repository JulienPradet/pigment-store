import React from 'react'
import SplitMatch from '../util/Router/SplitMatch'

const Component = ({component, pathname}) => {
  return <div>
    <SplitMatch
      exactly
      pattern={`${pathname}`}
      import={() => System.import('./Current').then((module) => module.default)}
      render={(CurrentComponent) => ({pathname}) => <CurrentComponent component={component} pathname={pathname} />}
    />
    <SplitMatch
      pattern={`${pathname}/:featureName`}
      import={() => System.import('../Feature/Main').then((module) => module.default)}
      render={(Feature) => ({pathname, params}) => {
        const featureName = params.featureName
        const feature = component.features.find((feature) => feature.name === featureName)
        return <Feature feature={feature} component={component} pathname={pathname} />
      }}
    />
  </div>
}

export default Component
