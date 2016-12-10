import React from 'react'
import { Link } from 'react-router'
import FeatureDisplay from '../Feature/Display'
import Card from '../util/View/Card'
import { SectionTitle } from '../util/View/Title'
import { RendererContextType } from '../../util/Renderer'

const ComponentPreview = ({component, pathname}, {Renderer}) => {
  let featureToDisplay = component.features.Default
  if (!featureToDisplay) {
    const firstKey = Object.keys(component.features)[0]
    featureToDisplay = component.features[firstKey]
  }

  const title = <SectionTitle>
    <Link to={`${pathname}/component-${component.name}`}>
      {component.name}
    </Link>
  </SectionTitle>

  const iframeLink = `${pathname}/component-${component.name}/feature-${featureToDisplay.name}`.replace(/^\/docs/, '')
  const subTitle = <FeatureDisplay pathname={iframeLink} />

  return <Card title={title} subTitle={subTitle} closable defaultClosed>
    <Renderer.Usage feature={featureToDisplay} component={component} />
  </Card>
}

ComponentPreview.contextTypes = {
  Renderer: RendererContextType
}

export default ComponentPreview
