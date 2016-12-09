import React from 'react'
import {Link} from 'react-router'
import FeatureDisplay from './Display.js'
import FeatureUsage from './Usage.js'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'

export default ({feature, component, pathname}) => {
  console.log(pathname)
  const fullPreviewLink = `${pathname.replace(/^\/docs/, '/full')}/feature-${feature.name}`
  const title = <SectionTitle>
    <Link to={fullPreviewLink}>{feature.name}</Link>
  </SectionTitle>

  const subTitle = <FeatureDisplay component={component} feature={feature} />

  return <Card title={title} subTitle={subTitle} closable defaultClosed>
    <FeatureUsage feature={feature} component={component} />
  </Card>
}
