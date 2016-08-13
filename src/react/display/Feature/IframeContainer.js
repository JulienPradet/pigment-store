import React from 'react'
import ReactDOM from 'react-dom'
import {compose} from 'recompose'
import {getConfig} from '../util/ConfigProvider'
import {getDisplayOptions} from '../DisplayOptions/ContextProvider'

const makeWrapperStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? '100%' : `${size.width * zoom / 100}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height * zoom / 100}px`,
  margin: '0 auto'
})

const makeStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? `${100 / zoom * 100}%` : `${size.width}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height}px`,
  transform: `scale(${zoom / 100})`,
  transformOrigin: 'top left',
  border: 0
})

const setInitialHtml = (document, html) => {
  document.open('text/htmlreplace')
  document.write(html || `
    <!doctype html>
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
      width: props.displayOptions.size.width === 'auto'
        ? 'auto'
        : props.displayOptions.size.width,
      height: props.displayOptions.size.height === 'auto'
        ? 100
        : props.displayOptions.size.height
    }
  }

  componentDidMount () {
    const iframeDocument = this.iframe.contentWindow.document
    setInitialHtml(iframeDocument, this.props.config.initialHtml)

    const [renderComponent, applyActions] = this.props.children

    const component = ReactDOM.render(
      renderComponent(),
      iframeDocument.getElementById('preview')
    )

    Promise.resolve()
      .then(() => {
        if (typeof this.props.config.onFrameLoaded === 'function') {
          return this.props.config.onFrameLoaded(iframeDocument)
        }
      })
      .then(() => {
        setTimeout(() => {
          iframeDocument.body.style.padding = '1em'
          this.setState({
            height: iframeDocument.body.scrollHeight
          })

          if (applyActions) {
            applyActions(component)
          }
        }, 100)
      })
  }

  render () {
    const size = {
      width: this.props.displayOptions.size.width === 'auto' ? this.state.width : this.props.displayOptions.size.width,
      height: this.props.displayOptions.size.height === 'auto' ? this.state.height : this.props.displayOptions.size.height
    }
    const zoom = this.props.displayOptions.zoom

    return <div style={makeWrapperStyle({size, zoom})}>
      <iframe ref={(ref) => { this.iframe = ref }} src='about:blank' style={makeStyle({size, zoom})} />
    </div>
  }
}

export default compose(
  getDisplayOptions(),
  getConfig()
)(IframeContainer)
