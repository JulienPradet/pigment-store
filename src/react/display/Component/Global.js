import React from 'react'
import {Link} from 'react-router'
import Card from '../util/View/Card'
import * as StackedList from '../util/View/StackedList'
import * as LinkList from '../util/View/LinkList'
import {PageTitle} from '../util/View/Title'
import {Meta} from '../util/View/Meta'
import FeatureList from '../Feature/List'
import {makePath} from '../router'

const stackDependencies = (dependencies) => {
  const stackedDependencies = dependencies
    .reduce((stackedDependencies, dependency) => {
      let currentStack
      if (stackedDependencies.hasOwnProperty(dependency.suiteName)) {
        currentStack = [...stackedDependencies[dependency.suiteName], dependency.componentName]
      } else {
        currentStack = [dependency.componentName]
      }

      return Object.assign({},
        stackedDependencies,
        {[dependency.suiteName]: currentStack}
      )
    }, {})

  return Object.keys(stackedDependencies)
    .map((suiteName) => ({
      suiteName,
      components: stackedDependencies[suiteName]
    }))
}

const DependencyList = ({dependencies}) => <StackedList.Container>
  {stackDependencies(dependencies)
    .map(({suiteName, components}, index) => <StackedList.Row key={index}>
      <StackedList.Item>
        <Link to={makePath(suiteName)}>{suiteName}</Link>
      </StackedList.Item>
      <StackedList.Item>
        <StackedList.Container>
          {components.map((componentName) => <StackedList.Row key={componentName}>
            <StackedList.Item>
              <Link to={makePath(suiteName, componentName)}>{componentName}</Link>
            </StackedList.Item>
          </StackedList.Row>)}
        </StackedList.Container>
      </StackedList.Item>
    </StackedList.Row>)}
</StackedList.Container>

const ComponentDetails = ({component}) => <div>
  {Object.keys(component.Component.__PIGMENT_META.reliesOn).length > 0
    ? <LinkList.Container>
      <LinkList.Title>Relies on</LinkList.Title>
      <LinkList.Content>
        <DependencyList dependencies={component.Component.__PIGMENT_META.reliesOn} />
      </LinkList.Content>
    </LinkList.Container>
    : null}
  {Object.keys(component.Component.__PIGMENT_META.isReliedOnBy).length > 0
    ? <LinkList.Container>
      <LinkList.Title>Is relied on by</LinkList.Title>
      <LinkList.Content>
        <DependencyList dependencies={component.Component.__PIGMENT_META.isReliedOnBy} />
      </LinkList.Content>
    </LinkList.Container>
    : null}
</div>

const Component = ({suiteName, name, component}) => {
  const title = <div>
    <PageTitle>{name}</PageTitle>
    <Meta>{component.Component.__PIGMENT_META.file}</Meta>
  </div>

  return <div>
    <Card title={title} closable defaultClosed>
      <ComponentDetails component={component} />
    </Card>

    <FeatureList component={component} componentName={name} suiteName={suiteName} />
  </div>
}

export default (suiteName, componentName, component) => class extends React.Component {
  constructor () {
    super()
    document.title = `${suiteName} | ${componentName}`
  }

  render () {
    return <Component {...this.props} suiteName={suiteName} name={componentName} component={component} />
  }
}
