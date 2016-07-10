import React from 'react'
import {ModalLink} from '../util/View/Modal'
import FeatureDisplay from './Display.js'
import FeatureUsage from './Usage.js'
import { makePath, nameToPath } from '../router'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'

export default ({prefix, name, feature}) => {
  const title = <SectionTitle>
    <ModalLink to={makePath('/preview' + prefix, name)}>
      {name}
    </ModalLink>
  </SectionTitle>

  const subTitle = <FeatureDisplay feature={feature} />

  return <Card id={nameToPath(name)} title={title} subTitle={subTitle} closable defaultClosed>
    <FeatureUsage feature={feature} />
  </Card>
}
