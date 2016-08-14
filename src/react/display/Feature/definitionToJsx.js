import React from 'react'

export const getComponentName = (component) => {
  if (typeof component === 'string') {
    return component
  } else {
    return component.displayName || component.name
  }
}

const getStandaloneValue = (value) => {
  let preparation, jsx

  if (value instanceof Array) {
    const {preparation: childrenPreparation, jsx: childrenJsx} = value.map(getStandaloneValue)
      .reduce(({preparation, jsx}, {preparation: itemPreparation, jsx: itemJsx}) => {
        if (itemPreparation) {
          preparation = [...preparation, itemPreparation]
        }
        jsx = [...jsx, itemJsx]

        return {preparation, jsx}
      }, {preparation: [], jsx: []})

    jsx = childrenJsx.join('\n')
    preparation = childrenPreparation.join('\n\n')
  } else if (typeof value === 'string') {
    jsx = value
  } else if (typeof value === 'boolean') {
    jsx = `{${value ? 'true' : 'false'}}`
  } else if (React.isValidElement(value)) {
    const subComponent = definitionToJsx(value.type, value.props)
    preparation = subComponent.preparation
    jsx = subComponent.jsx
  } else {
    jsx = `{${JSON.stringify(value)}}`
  }

  return {
    preparation,
    jsx
  }
}

const getProperty = (key, value) => {
  let preparation, inline

  if (typeof value === 'string') {
    if (value.length > 30) {
      preparation = `const ${key} = ${JSON.stringify(value)}`
      inline = `${key}={${key}}`
    } else {
      inline = `${key}=${JSON.stringify(value)}`
    }
  } else if (typeof value === 'boolean' && value) {
    inline = `${key}`
  } else if (React.isValidElement(value)) {
    const {preparation: subPreparation, jsx} = definitionToJsx(value.type, value.props)
    if (subPreparation) {
      subPreparation + '\n\n'
    }

    preparation = subPreparation + `const ${key} = ${jsx}`
    inline = `${key}={${key}}`
  } else if (typeof value === 'object' && Object.keys(value).length > 2) {
    preparation = `const ${key} = ${JSON.stringify(value, null, 2)}`
    inline = `${key}={${key}}`
  } else {
    inline = `${key}={${JSON.stringify(value)}}`
  }

  return {
    preparation,
    inline
  }
}

const indent = '  '
const definitionToJsx = (component, props = {}) => {
  const name = getComponentName(component)

  const formattedProps = Object.keys(props)
    .filter((key) => key !== 'children')
    .map((key) => getProperty(key, props[key]))

  const isPropsMultiLine = formattedProps.length > 2

  const inlineProps = formattedProps
    .map(({inline}) => inline)
    .map((prop) => isPropsMultiLine ? `${indent}${prop}` : prop)

  const propsPreparation = formattedProps
    .filter(({preparation}) => preparation)
    .map(({preparation}) => preparation + '\n\n')

  const result = []
  const firstTag = []
  firstTag.push(`<${name}${isPropsMultiLine || formattedProps.length === 0 ? '' : ' '}`)

  if (inlineProps.length > 0) {
    firstTag.push(inlineProps.join(isPropsMultiLine ? '\n' : ' '))
  }

  if (props.hasOwnProperty('children')) {
    firstTag.push('>')
  } else {
    firstTag.push(isPropsMultiLine ? '/>' : ' />')
  }
  result.push(firstTag.join(isPropsMultiLine ? '\n' : ''))

  let isMultiLine
  if (props.hasOwnProperty('children')) {
    const {preparation, jsx} = getStandaloneValue(props.children)
    isMultiLine = jsx.length > 30 || /\n/.test(jsx) || /<[^>]+>/.test(jsx)

    if (preparation) {
      propsPreparation.push(preparation)
    }

    result.push(isMultiLine ? indent + jsx.replace(/\n/g, `\n${indent}`) : jsx)
    result.push(`</${name}>`)
  }

  return {
    preparation: propsPreparation.join(''),
    jsx: result.join(isMultiLine ? '\n' : '')
  }
}

export default (component, name) => {
  const {preparation, jsx} = definitionToJsx(component, name)
  return preparation + jsx
}
