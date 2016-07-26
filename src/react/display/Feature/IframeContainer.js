import React from 'react'
import ReactDOM from 'react-dom'
import {getDisplayOptions} from '../DisplayOptions/ContextProvider'

const makeWrapperStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? 'auto' : `${size.width * zoom / 100}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height * zoom / 100}px`
})

const makeStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? 'auto' : `${size.width}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height}px`,
  transform: `scale(${zoom / 100})`,
  transformOrigin: 'top left',
  border: 0
})

const setInitialHtml = (document) => {
  document.open('text/htmlreplace')
  document.write(`
    <!doctype html>
    <head>
      <style>
      </style>
    </head>
    <html>
      <body>
        <div id="preview"></div>
      </body>
    </html>
  `)
  document.close()

  return document
}

class IframeContainer extends React.Component {
  constructor (props) {
    super()
    this.state = {
      height: props.displayOptions.size.height === 'auto'
        ? 100
        : this.props.displayOptions.size.height
    }
  }

  componentDidMount () {
    const iframeDocument = this.iframe.contentWindow.document
    setInitialHtml(iframeDocument)

    const [renderComponent, applyActions] = this.props.children

    const component = ReactDOM.render(
      renderComponent(),
      iframeDocument.getElementById('preview')
    )

    this.setState({
      height: iframeDocument.documentElement.offsetHeight
    })

    if (applyActions) {
      applyActions(component)
    }
  }

  render () {
    const size = {
      width: this.props.displayOptions.size.width,
      height: this.props.displayOptions.size.height === 'auto' ? this.state.height : this.props.displayOptions.size.height
    }
    const zoom = this.props.displayOptions.zoom

    return <div style={makeWrapperStyle({size, zoom})}>
      <iframe ref={(ref) => { this.iframe = ref }} src='about:blank' style={makeStyle({size, zoom})} />
    </div>
  }
}

export default (
  getDisplayOptions()
)(IframeContainer)
