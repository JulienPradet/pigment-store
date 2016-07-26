import React from 'react'
import Card from './util/View/Card'
import Markdown from './util/View/Markdown'

export default (indexCategory) => () => <Card>
  <Markdown>{indexCategory.description}</Markdown>
</Card>
