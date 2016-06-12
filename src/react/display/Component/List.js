import React from 'react'

import ComponentPreview from './Preview'

export default ({suite}) => <div>
  {Object.keys(suite.components)
    .map((name) => ({name, component: suite.components[name]}))
    .map(({name, component}) => <ComponentPreview
      key={name}
      suite={suite}
      component={component}
      name={name}
    />)}
</div>
