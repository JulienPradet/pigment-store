import React from 'react'
import describe from 'pigment-store/react/describe'
import {Container, Group, Item} from '../../../../../../src/core/display/App/util/View/HorizontalMenu/index'

export default describe('HorizontalMenu', Container)
  .featureJsx(
    'Default',
    () => (
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
  )
