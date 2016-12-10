import React from 'react'
import {withContext, getContext} from 'recompose'

const configType = {
  config: React.PropTypes.object.isRequired
}

export const ConfigProvider = withContext(
  configType,
  ({config}) => ({ config })
)(({children}) => React.Children.only(children))

ConfigProvider.displayName = 'ConfigProvider'

export const getConfig = () => getContext(configType)
