import React from 'react'
import PigmentStore from '../../../../../dist/index'
import {Container, Row, Item} from '../../../../../src/core/display/App/util/View/StackedList/index'

export default PigmentStore.React.describe('StackedList', Container)
  .featureJsx(
    'Default',
    <Container>
      <Row>
        <Item>
          <a href='/parent'>Parent</a>
        </Item>
        <Item>
          <Container>
            <Row>
              <Item>
                <a href='/parent/child1'>Child 1</a>
              </Item>
            </Row>
            <Row>
              <Item>
                <a href='/parent/child2'>Child 2</a>
              </Item>
            </Row>
            <Row>
              <Item>
                <a href='/parent/child3'>Child 3</a>
              </Item>
            </Row>
          </Container>
        </Item>
      </Row>
    </Container>
  )
  .featureJsx(
    'With many levels of descendance',
    <Container>
      <Row>
        <Item>
          <a href=''>#1</a>
        </Item>
        <Item>
          <Container>
            <Row>
              <Item>
                <a href=''>#11</a>
              </Item>
            </Row>
            <Row>
              <Item>
                <a href=''>#12</a>
              </Item>
              <Item>
                <Container>
                  <Row>
                    <Item>
                      <a href=''>#121</a>
                    </Item>
                    <Item>
                      <Container>
                        <Row>
                          <Item>
                            <a href=''>#1211</a>
                          </Item>
                        </Row>
                        <Row>
                          <Item>
                            <a href=''>#1212</a>
                          </Item>
                        </Row>
                      </Container>
                    </Item>
                  </Row>
                  <Row>
                    <Item>
                      <a href=''>#122</a>
                    </Item>
                  </Row>
                </Container>
              </Item>
            </Row>
            <Row>
              <Item>
                <a href=''>#13</a>
              </Item>
            </Row>
          </Container>
        </Item>
      </Row>
      <Row>
        <Item>
          <a href=''>#2</a>
        </Item>
        <Item>
          <Container>
            <Row>
              <Item>
                <a href=''>#21</a>
              </Item>
            </Row>
            <Row>
              <Item>
                <a href=''>#21</a>
              </Item>
            </Row>
          </Container>
        </Item>
      </Row>
    </Container>
  )
