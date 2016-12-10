import React from 'react'
import {Match} from 'react-router'
import FeatureDisplay from '../Feature/Display'

const FullPreviewFeature = ({component, feature}) => (
  <FeatureDisplay component={component} feature={feature} fullHeight />
)

const FullPreviewComponent = ({component, prefix}) => (
  <div>
    {component.features.map((feature) => (
      <Match key={feature.name} pattern={`${prefix}/feature-${feature.name}`} render={() => (
        <FullPreviewFeature component={component} feature={feature} />
      )} />
    ))}
  </div>
)

const FullPreviewCategory = ({category, prefix}) => (
  <div>
    {category.categories.map((category) => (
      <Match key={category.name} pattern={`${prefix}/category-${category.name}`} render={({pattern}) => (
        <FullPreviewCategory category={category} prefix={pattern} />
      )} />
    ))}
    {category.components.map((component) => (
      <Match key={component.name} pattern={`${prefix}/component-${component.name}`} render={({pattern}) => (
        <FullPreviewComponent component={component} prefix={pattern} />
      )} />
    ))}
  </div>
)

export default FullPreviewCategory
