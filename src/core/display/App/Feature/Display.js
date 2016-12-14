import React from 'react'
import {compose} from 'recompose'
import {getConfig} from '../util/ConfigProvider'
import {getDisplayOptions} from '../DisplayOptions/ContextProvider'

const makeWrapperStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? '100%' : `${size.width * zoom / 100}px`,
  height: size.height === 'auto' ? '100%' : `100%`,
  margin: '0 auto',
  ...size.height === 'auto' ? { display: 'flex', alignItems: 'center' } : {}
})

const makeStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? `${100 / zoom * 100}%` : `${size.width}px`,
  height: size.height === 'auto' ? '100%' : `${size.height}px`,
  transform: `scale(${zoom / 100})`,
  transformOrigin: 'top left',
  border: 0
})

class Display extends React.Component {
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
    if (this.iframe) {
      this.iframe.contentWindow.renderCallback = () => {
        Promise.resolve()
        .then(() => {
          if (this.props.fullHeight) {
            return 'auto'
          } else {
            return this.iframe.contentDocument.body.scrollHeight
          }
        })
        .then((height) => {
          this.setState({
            height: height
          })
        })
      }
    }
  }

  render () {
    const size = {
      width: this.props.displayOptions.size.width === 'auto' ? this.state.width : this.props.displayOptions.size.width,
      height: this.props.displayOptions.size.height === 'auto' ? this.state.height : this.props.displayOptions.size.height
    }
    const zoom = this.props.displayOptions.zoom

    return <div style={makeWrapperStyle({size, zoom})}>
      <iframe
        ref={(ref) => { this.iframe = ref }}
        src={`iframe.html#${this.props.pathname}`}
        style={makeStyle({size, zoom})}
      />
    </div>
  }
}

export default compose(
  getDisplayOptions(),
  getConfig()
)(Display)
