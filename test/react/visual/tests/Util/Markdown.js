import React from 'react'
import describe from 'pigment-store/react/describe'
import Markdown from '../../../../../src/core/display/App/util/View/Markdown/index'

export default describe('Markdown', Markdown)
  .featureJsx(
    'Default',
    () => (
      <Markdown>
        {`# Hi!

  Here is some **basic** markdown`}
      </Markdown>
    )
  )
  .featureJsx(
    'With code',
    () => (
      <Markdown>
        ```jsx
        {`// Comment
  <div class="test">HTML</div>`}
        ```
      </Markdown>
    )
  )
