import React from 'react'
import {Link} from 'react-router'
import FeatureDisplay from '../Feature/Display.js'
import FeatureUsage from '../Feature/Usage.js'
import Card from '../util/View/Card'
import {SectionTitle} from '../util/View/Title'

export default ({component, pathname}) => {
  let featureToDisplay = component.features.Default
  if (!featureToDisplay) {
    const firstKey = Object.keys(component.features)[0]
    featureToDisplay = component.features[firstKey]
  }

  const title = <SectionTitle>
    <Link to={`${pathname}/component-${component.name}`}>
      {component.name}
    </Link>
  </SectionTitle>

  const subTitle = <FeatureDisplay feature={featureToDisplay} />

  return <Card title={title} subTitle={subTitle} closable defaultClosed>
    <FeatureUsage feature={featureToDisplay} />
  </Card>
}
