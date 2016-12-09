import React from 'react'
import PigmentStore from '../../../../../dist/index'
import Card from '../../../../../src/react/display/util/View/Card/index'

const cardContent = {
  title: 'Card Title',
  subTitle: 'Short summary of the card',
  children: 'Actual description of the card. The content can be very versatile and as long as needed.'
}

const Span = (props) => <span {...props} />

export default PigmentStore.React.describe('Card', Card)
  .setDescription(`
A card is a block containing a title and a content that serves as a detailed description.

The main feature of a Card is that the content can be collapsed.
  `)
  .feature(
    'Default',
    cardContent
  )
  .feature(
    'Closable card',
    Object.assign({}, cardContent, {closable: true})
  )
  .feature(
    'Closable card initialized as closed',
    Object.assign({}, cardContent, {closable: true, defaultClosed: true})
  )
  .feature(
    'Card with a component as a title',
    Object.assign({}, cardContent, {
      closable: true,
      defaultClosed: true,
      title: <Span style={{color: 'red'}}>Title</Span>
    })
  )
