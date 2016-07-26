import React from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import markdown from 'markdown-it'

const md = markdown({
  html: false,
  xhtmlOut: false,
  breaks: false,
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
  highlight: function (code, lang = 'jsx') {
    if (!Prism.languages.hasOwnProperty(lang)) {
      lang = 'jsx'
    }

    return `<pre class="language-${lang}"><code>${Prism.highlight(code, Prism.languages[lang])}</code></pre>`
  }
})

export default class Markdown extends React.Component {
  constructor (props) {
    super()
    this.state = {
      content: props.children
        ? md.render(typeof props.children === 'string' ? props.children : props.children.join('\n'))
        : ''
    }
  }

  render () {
    return <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
  }
}
