import describe from './definition/Component'
import Usage from './display/Usage'
import Render from './display/Render'
import renderApp from '../core/display/App'
import renderIframe from '../core/display/Iframe'

export default {
  renderApp: renderApp({Render, Usage}),
  renderIframe: renderIframe({Render, Usage}),
  describe
}
