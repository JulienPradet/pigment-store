import React from 'react'
import {Link} from 'react-router'

const ChildrenLinks = ({children}) => (
  <ul>
    {children.map(({pattern, name}) => (
      <li key={pattern}>
        <Link to={pattern}>{name}</Link>
      </li>
    ))}
  </ul>
)

export default ChildrenLinks
