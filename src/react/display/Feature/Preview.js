import React from 'react'
import {ModalLink} from '../util/View/Modal'
import FeatureDisplay from './Display.js'
import FeatureUsage from './Usage.js'
import { makePath } from '../router'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'

export default ({suiteName, componentName, name, feature}) => {
  const title = <SectionTitle>
    <ModalLink to={makePath(suiteName, componentName, name)}>
      {name}
    </ModalLink>
  </SectionTitle>

  const subTitle = <FeatureDisplay feature={feature} />

  return <Card id={featureNameToPath(name)} title={title} subTitle={subTitle} closable defaultClosed>
    <FeatureUsage feature={feature} />
  </Card>
}
