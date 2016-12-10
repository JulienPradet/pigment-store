import React from 'react'
import {Link} from 'react-router'
import FeatureDisplay from './Display.js'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'
import { RendererContextType } from '../../util/Renderer'

const FeaturePreview = ({feature, component, pathname}, {Renderer}) => {
  const previewIframeLink = `${pathname}/feature-${feature.name}`.replace(/^\/docs/, '')

  const fullPreviewLink = `/full${previewIframeLink}`
  const title = <SectionTitle>
    <Link to={fullPreviewLink}>{feature.name}</Link>
  </SectionTitle>

  const subTitle = <FeatureDisplay pathname={previewIframeLink} />

  return <Card title={title} subTitle={subTitle} closable defaultClosed>
    <Renderer.Usage feature={feature} component={component} />
  </Card>
}

FeaturePreview.contextTypes = {
  Renderer: RendererContextType
}

export default FeaturePreview
