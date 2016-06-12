import React from 'react'

import {Container} from '../util/View/SidebarMenu'
import SuiteNavigation from './SuiteNavigation'

export default ({suites}) => <Container>
  {suites.map((suite) => <SuiteNavigation key={suite.name} pathPrefix='/' suite={suite} />)}
</Container>
