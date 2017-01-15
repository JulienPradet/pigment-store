import React from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-jsx'

const Code = ({lang, children}) => (
  <pre className={`language-${lang}`}>
    <code dangerouslySetInnerHTML={{__html: Prism.highlight(children, Prism.languages[lang])}} />
  </pre>
)

export default Code
