import React from 'react'
import {Link} from 'react-router'
import {Container, Item} from '../../util/View/HorizontalList'

const FeatureNavigation = ({parentPathname, feature}) => (
  <Container>
    <Item active>
      <Link to={parentPathname}>{feature.name}</Link>
    </Item>
  </Container>
)

export default FeatureNavigation
