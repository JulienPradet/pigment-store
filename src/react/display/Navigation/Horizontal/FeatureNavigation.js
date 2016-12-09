import React from 'react'
import {Link} from 'react-router'
import {Container, Item} from '../../util/View/HorizontalList'

const FeatureNavigation = ({parentPattern, feature}) => (
  <Container>
    <Item active>
      <Link to={parentPattern}>{feature.name}</Link>
    </Item>
  </Container>
)

export default FeatureNavigation
