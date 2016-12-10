import React from 'react'
import {Link} from 'react-router'
import * as StackedList from '../util/View/StackedList'
import * as LinkList from '../util/View/LinkList'

const makePath = (prefix, type, path) => {
  return `${prefix}/${type}-${path}`
}

const stackDependencies = (dependencies = []) => {
  const firstLevelStackObject = dependencies
    .filter((path) => path.length > 0)
    .map((path) => ({
      path: path[0],
      children: path.slice(1).filter((path) => path.length > 0)
    }))
    .reduce((stacks, {path, children}) => {
      const pathStack = children.length > 0
        ? stacks.hasOwnProperty(path)
          ? [...stacks[path], children]
          : [children]
        : []

      return Object.assign(
        {},
        stacks,
        {[path]: pathStack}
      )
    }, {})

  const stackedDependencies = Object
    .keys(firstLevelStackObject)
    .map((key) => ({
      path: key,
      type: firstLevelStackObject[key].length > 0 ? 'category' : 'component',
      children: firstLevelStackObject[key]
    }))
    .map(({path, type, children}) => ({
      path,
      type,
      children: stackDependencies(children)
    }))

  return stackedDependencies
}

const StackedDependencyList = ({prefix = '/docs', stackedDependencies}) => <StackedList.Container>
  {stackedDependencies
    .map(({path, type, children}, index) => <StackedList.Row key={index}>
      <StackedList.Item>
        <Link to={makePath(prefix, type, path)}>{path}</Link>
      </StackedList.Item>
      {children && children.length > 0
        ? <StackedList.Item>
          <StackedDependencyList prefix={makePath(prefix, type, path)} stackedDependencies={children} />
        </StackedList.Item>
        : null}
    </StackedList.Row>)}
</StackedList.Container>

const DependencyList = ({dependencies}) => <StackedDependencyList
  stackedDependencies={stackDependencies(dependencies.map(({path}) => path))}
/>

export default ({component}) => <div>
  {Object.keys(component.Component.__PIGMENT_META.reliesOn || {}).length > 0
    ? <LinkList.Container>
      <LinkList.Title>Relies on</LinkList.Title>
      <LinkList.Content>
        <DependencyList dependencies={component.Component.__PIGMENT_META.reliesOn} />
      </LinkList.Content>
    </LinkList.Container>
    : null}
  {Object.keys(component.Component.__PIGMENT_META.isReliedOnBy || {}).length > 0
    ? <LinkList.Container>
      <LinkList.Title>Is relied on by</LinkList.Title>
      <LinkList.Content>
        <DependencyList dependencies={component.Component.__PIGMENT_META.isReliedOnBy} />
      </LinkList.Content>
    </LinkList.Container>
    : null}
</div>
