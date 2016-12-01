import React from 'react'
import Card from '../util/View/Card'
import Markdown from '../util/View/Markdown'
import {PageTitle} from '../util/View/Title'
import {Meta} from '../util/View/Meta'
import FeatureList from '../Feature/List'
import Dependencies from './Dependencies'

export default class Component extends React.Component {
  constructor (props) {
    super()
    document.title = `${props.component.name}`
  }

  render () {
    const component = this.props.component

    const title = <div>
      <PageTitle>{component.name}</PageTitle>
      <Meta>{component.Component.__PIGMENT_META.file}</Meta>
    </div>

    const subTitle = component.description
      ? <Markdown>{component.description}</Markdown>
      : null

    return <div>
      <Card id='component' title={title} subTitle={subTitle} closable defaultClosed>
        <Dependencies component={component} />
      </Card>

      <FeatureList component={component} />
    </div>
  }
}
