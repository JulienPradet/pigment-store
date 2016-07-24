import React from 'react'

import ComponentPreview from './Preview'

export default ({category, prefix}) => <div>
  {Object.keys(category.components)
    .map((name) => ({name, component: category.components[name]}))
    .map(({name, component}) => <ComponentPreview
      key={name}
      prefix={prefix}
      category={category}
      component={component}
      name={name}
    />)}
</div>
