import React from 'react'

import ComponentPreview from './Preview'

export default ({suite, prefix}) => <div>
  {Object.keys(suite.components)
    .map((name) => ({name, component: suite.components[name]}))
    .map(({name, component}) => <ComponentPreview
      key={name}
      prefix={prefix}
      suite={suite}
      component={component}
      name={name}
    />)}
</div>
