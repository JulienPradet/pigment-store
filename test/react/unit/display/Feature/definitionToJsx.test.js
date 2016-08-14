import test from 'tape'
import React from 'react'
import definitionToJsx from '../../../../../src/react/display/Feature/definitionToJsx'

const loremIpsum = "Lorem ipsum dolor sit amet. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

class Component extends React.Component {
  render () {
    return <div {...this.props} />
  }
}

test('When no props is passed, it is formatted as a single tag', (t) => {
  const expected = '<Component />'
  const actual = definitionToJsx(Component)

  t.equals(actual, expected)
  t.end()
})

test('When children as string is passed, it should be placed between two tags', (t) => {
  const expected = '<Component>Content</Component>'
  const actual = definitionToJsx(Component, {children: 'Content'})

  t.equals(actual, expected)
  t.end()
})

test('When a string property is passed, it should be as `key="value"`', (t) => {
  const expected = '<Component key="value" />'
  const actual = definitionToJsx(Component, {key: 'value'})

  t.equals(actual, expected)
  t.end()
})

test('When a long string property is passed, it should be extracted in a variable', (t) => {
  const expected = `const text = "Lorem ipsum dolor sit amet. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

<Component text={text} />`
  const actual = definitionToJsx(Component, {text: loremIpsum})

  t.equals(actual, expected)
  t.end()
})

test('When a boolean property is passed, it should be as `key`', (t) => {
  const expected = '<Component key />'
  const actual = definitionToJsx(Component, {key: true})

  t.equals(actual, expected)
  t.end()
})

test('When an object property is passed, it should be as `key={json_representing_the_object}`', (t) => {
  const expected = '<Component style={{"color":"#ff0000"}} />'
  const actual = definitionToJsx(Component, {style: {color: '#ff0000'}})

  t.equals(actual, expected)
  t.end()
})

test('When a complex object property (> 2 keys) is passed, it should be extracted in a variable', (t) => {
  const expected = `const style = {
  "color": "#ff0000",
  "border": "1px solid #00ff00",
  "padding": "1em"
}

<Component style={style} />`

  const actual = definitionToJsx(Component, {style: {color: '#ff0000', border: '1px solid #00ff00', padding: '1em'}})

  t.equals(actual, expected)
  t.end()
})

test('When a React node is passed as a property, it should be extracted in a variable', (t) => {
  const expected = `const title = <h2>Title</h2>

<Component title={title} />`

  const actual = definitionToJsx(Component, {title: <h2>Title</h2>})

  t.equals(actual, expected)
  t.end()
})

test('When many inline properties are passed (> 2), there should be breaking lines', (t) => {
  const expected = `<Component
  title="Title"
  style={{"color":"#ff0000"}}
  highlighted
/>`

  const actual = definitionToJsx(Component, {title: 'Title', style: {color: '#ff0000'}, highlighted: true})

  t.equals(actual, expected)
  t.end()
})

test('When a React node children is passed, it should be transformed into JSX', (t) => {
  const expected = `<Component>
  <h2>Title</h2>
</Component>`

  const actual = definitionToJsx(Component, {children: <h2>Title</h2>})

  t.equals(actual, expected)
  t.end()
})

test('When a custom React node children is passed, it should be transformed into JSX', (t) => {
  const expected = `<Component>
  <Title>Title</Title>
</Component>`

  const Title = (props) => <h2>{props.Title}</h2>

  const actual = definitionToJsx(Component, {children: <Title>Title</Title>})

  t.equals(actual, expected)
  t.end()
})

test('When a custom React node children is passed, it should be transformed into JSX and preferrably use the displayName', (t) => {
  const expected = `<Component>
  <TitleDisplayName>Title</TitleDisplayName>
</Component>`

  const Title = (props) => <h2>{props.Title}</h2>
  Title.displayName = 'TitleDisplayName'

  const actual = definitionToJsx(Component, {children: <Title>Title</Title>})

  t.equals(actual, expected)
  t.end()
})

test('When a custom React node children is passed, its variables should bubble up', (t) => {
  const expected = `const prop = {
  "propA": "a",
  "propB": "b",
  "propC": "c"
}

<Component>
  <TitleDisplayName prop={prop}>Title</TitleDisplayName>
</Component>`

  const Title = (props) => <h2>{props.Title}</h2>
  Title.displayName = 'TitleDisplayName'

  const actual = definitionToJsx(Component, {children: <Title prop={{propA: 'a', propB: 'b', propC: 'c'}}>Title</Title>})
  console.log(actual)

  t.equals(actual, expected)
  t.end()
})

test('When multiple React node children are passed, they should be transformed into JSX', (t) => {
  const expected = `<List>
  <Item>Item</Item>
  <Item>Item</Item>
  <Item>Item</Item>
</List>`

  const List = (props) => <ul>{props.children}</ul>
  const Item = (props) => <li>{props.children}</li>

  const actual = definitionToJsx(List, {children: [
    <Item>Item</Item>,
    <Item>Item</Item>,
    <Item>Item</Item>
  ]})

  t.equals(actual, expected)
  t.end()
})

test('When a function is passed, it should be extracted in a variable', (t) => {
  const expected = `function onChangeHandler(event) {
      console.log(event);
    }

<input onChange={onChangeHandler} />`

  const actual = definitionToJsx('input', {onChange: function onChangeHandler (event) {
    console.log(event)
  }})

  t.equals(actual, expected)
  t.end()
})

test('When a function is passed as a children, it should be extracted in a variable', (t) => {
  const expected = `<Component>
  {function () {
        // render some children here
      }}
</Component>`

  const actual = definitionToJsx('Component', {children: [function () {
    // render some children here
  }]})

  t.equals(actual, expected)
  t.end()
})
