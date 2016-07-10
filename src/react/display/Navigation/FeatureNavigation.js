import React from 'react'
import Highlighter from 'react-highlight-words'
import {compose, withProps} from 'recompose'
import {Link} from 'react-router'

import {Item} from '../util/View/SidebarMenu'
import {makePath} from '../router'

export default compose(
  withProps(({pathPrefix, name}) => ({
    path: makePath(pathPrefix, name)
  })),
  withProps(({isActive, path}) => ({
    active: isActive(path)
  }))
)(({name, component, search, path, active}) => {
  return <Item isActive={active}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
    </Link>
  </Item>
})
