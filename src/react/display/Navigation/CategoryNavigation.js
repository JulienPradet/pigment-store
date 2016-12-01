import React from 'react'
import {Match, Link} from 'react-router'
import Highlighter from 'react-highlight-words'
import {featureContainsSearch, componentContainsSearch, categoryContainsSearch} from './index'
import {Container, Item} from '../util/View/SidebarMenu'

const FeatureNavigation = ({feature, pathname, search}) => (
  <Item fade>
    <Link to={pathname}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={feature.name}
      />
    </Link>
  </Item>
)

const ComponentSubNavigation = ({component, pathname, search, displayAll}) => (
  <Container>
    {component.features
      .filter((feature) => displayAll || search === '' || featureContainsSearch(search)(feature))
      .map((feature) => (
        <FeatureNavigation
          key={feature.name}
          pathname={pathname}
          feature={feature}
          search={search}
        />
      ))}
  </Container>
)

const ComponentNavigation = ({pathname, component, search}) => (
  <Match pattern={`${pathname}/component-${component.name}`} children={({matched, pattern}) => (
    <Item isActive={matched}>
      <Link to={pattern}>
        <Highlighter
          searchWords={[search]}
          textToHighlight={component.name}
        />
      </Link>
      {matched || componentContainsSearch(search)(component)
        ? <ComponentSubNavigation
          component={component}
          pathname={pattern}
          search={search}
          displayAll={matched}
        />
        : null
      }
    </Item>
  )} />
)

const CategorySubNavigation = ({category, pathname, search, displayAll}) => <Container>
  {category.categories
    .filter((category) => displayAll || search === '' || categoryContainsSearch(search)(category))
    .map((category) => (
      <CategoryNavigation
        key={category.name}
        category={category}
        pathname={pathname}
        search={search}
      />
    ))}
  {category.components
    .filter((component) => displayAll || search === '' || componentContainsSearch(search)(component))
    .map((component) => (
      <ComponentNavigation
        key={component.name}
        pathname={pathname}
        component={component}
        search={search}
      />
    ))}
</Container>

const CategoryNavigation = ({category, pathname, search}) => (
  <Match pattern={`${pathname}/category-${category.name}`} children={({matched, pattern}) => {
    return (
      <Item isActive={matched}>
        <Link to={pattern}>
          <Highlighter
            searchWords={[search]}
            textToHighlight={category.name}
          />
        </Link>
        {matched || categoryContainsSearch(search)(category)
          ? <CategorySubNavigation
            pathname={pattern}
            category={category}
            search={search}
            displayAll={matched}
          />
          : null
        }
      </Item>
    )
  }} />
)

export { CategorySubNavigation }
