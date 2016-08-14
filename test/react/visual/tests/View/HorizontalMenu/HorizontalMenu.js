import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import {Container, Group, Item} from '../../../../../../src/react/display/util/View/HorizontalMenu/index'

export default PigmentStore.React.describe('HorizontalMenu', Container)
  .featureJsx(
    'Default',
    <Container>
      <Group>
        <Item>Item 1</Item>
      </Group>
      <Group>
        <Item>Item 2</Item>
      </Group>
      <Group>
        <Item>Item 3</Item>
      </Group>
    </Container>
  )