import React from 'react'
import describe from 'pigment-store/react/describe'
import {SidebarMenu, MenuTitle, Item, Search, Container} from '../../../../../src/core/display/App/util/View/SidebarMenu/index'

const onSearchChange = (newSearch) => {
  console.log(newSearch)
}

export default describe('SidebarMenu', SidebarMenu)
  .featureJsx(
    'Default',
    () => (
      <SidebarMenu>
        <MenuTitle><a href='/'>Pigment Store</a></MenuTitle>
        <Item>
          <Search search='Current search' onChange={onSearchChange} />
        </Item>
        <Item>
          <Container>
            <Item>
              <a href='/menu'>About</a>
            </Item>
          </Container>
        </Item>
      </SidebarMenu>
    )
  )
  .featureJsx(
    'With sub categories',
    () => (
      <SidebarMenu>
        <MenuTitle><a href='/'>Pigment Store</a></MenuTitle>
        <Item>
          <Search search='Current search' onChange={onSearchChange} />
        </Item>
        <Item>
          <Container>
            <Item isActive>
              <a href='/category'>Category</a>
              <Container>
                <Item>
                  <a href='/category/section1'>Section 1</a>
                </Item>
                <Item>
                  <a href='/category/section2'>Section 2</a>
                </Item>
                <Item>
                  <a href='/category/section3'>Section 3</a>
                </Item>
              </Container>
            </Item>
          </Container>
        </Item>
      </SidebarMenu>
    )
  )
