import React from 'react'
import PigmentStore from '../../../../../dist/index'
import {Container, Title, Content} from '../../../../../src/core/display/App/util/View/LinkList/index'

export default PigmentStore.React.describe('LinkList', Container)
  .featureJsx(
    'Default',
    <Container>
      <Title>Basic link list</Title>
      <Content>
        <ul>
          <li><a href='/'>Link 1</a></li>
          <li><a href='/'>Link 2</a></li>
          <li><a href='/'>Link 3</a></li>
        </ul>
      </Content>
    </Container>
  )
