import React from 'react'
import Highlighter from 'react-highlight-words'
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
)(({name, component, search, path, isActive}) => {
  return <Item isActive={isActive}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
    </Link>
  </Item>
})
