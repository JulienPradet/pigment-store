import React from 'react'
import FeatureDisplay from './Display.js'
import FeatureUsage from './Usage.js'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'

export default ({feature}) => {
  const title = <SectionTitle>
    {feature.name}
  </SectionTitle>

  const subTitle = <FeatureDisplay feature={feature} />

  return <Card title={title} subTitle={subTitle} closable defaultClosed>
    <FeatureUsage feature={feature} />
  </Card>
}
