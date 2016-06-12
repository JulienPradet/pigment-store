import React from 'react'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'

import {Item} from '../util/View/SidebarMenu'
import {featureNameToPath} from '../router'

export default compose(
  withRouter,
  withProps(({pathPrefix, name}) => ({
    path: `${pathPrefix}/${featureNameToPath(name)}`
  })),
  withProps(({router, path}) => ({
    isActive: router.isActive(path)
  }))
)(({name, component, path, isActive}) => {
  return <Item>
    <Link to={path}>{name}</Link>
  </Item>
})
