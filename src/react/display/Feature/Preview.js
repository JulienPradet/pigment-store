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
        <Link to={'.' + makePath(null, componentName, name)}>
          {name}
        </Link>
      </SectionTitle>
    </Card.Title>

    <Card.Content>
      <FeatureDisplay feature={feature} />
    </Card.Content>
  </Card.Container>
}
