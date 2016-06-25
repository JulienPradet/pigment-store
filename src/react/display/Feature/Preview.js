import React from 'react'
import {ModalLink} from '../util/View/Modal'
import FeatureDisplay from './Display.js'
import { makePath } from '../router'
import * as Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'

export default ({suiteName, componentName, name, feature}) => {
  return <Card.Container>
    <Card.Title>
      <SectionTitle>
        <ModalLink to={makePath(suiteName, componentName, name)}>
          {name}
        </ModalLink>
      </SectionTitle>
    </Card.Title>

    <Card.Content>
      <FeatureDisplay feature={feature} />
    </Card.Content>
  </Card.Container>
}
