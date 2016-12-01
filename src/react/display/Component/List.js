import React from 'react'

import ComponentPreview from './Preview'

export default ({category, pathname}) => <div>
  {category.components
    .map((component) => <ComponentPreview
      key={component.name}
      pathname={pathname}
      component={component}
    />)}
</div>
