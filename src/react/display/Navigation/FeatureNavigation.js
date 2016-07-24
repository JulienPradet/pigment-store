import React from 'react'
import Highlighter from 'react-highlight-words'
import {compose, withProps} from 'recompose'

import {Item} from '../util/View/SidebarMenu'
import {ModalLink} from '../util/View/Modal'
import {makeFeatureView} from '../router'

export default compose(
  withProps(({pathPrefix, name}) => ({
    path: makeFeatureView(pathPrefix, name)
  })),
  withProps(({isActive, path}) => ({
    active: isActive(path)
  }))
)(({name, component, search, path, active}) => {
  return <Item isActive={active}>
    <ModalLink to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
  </ModalLink>
  </Item>
})
