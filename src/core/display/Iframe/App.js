import React from 'react'
import { HashRouter, Match, Miss } from 'react-router'
import { RendererContextType } from '../util/Renderer'

const App = ({features}, {Renderer}) => {
  return <HashRouter>
    <div>
      {features.map(({pathname, component, feature}) => (
        <Match key={pathname} pattern={pathname} render={() => <Renderer.Render component={component} feature={feature} />} />
      ))}
      <Miss render={() => <div>Feature not found</div>} />
    </div>
  </HashRouter>
}

App.contextTypes = {
  Renderer: RendererContextType
}

export default App
