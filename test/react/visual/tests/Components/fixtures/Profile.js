import React from 'react'
import Title from './Title'
import Avatar from './Avatar'

const Profile = (props) => <div>
  <div><Avatar src={props.src} /></div>
  <div><Title>{props.children}</Title></div>
</div>

export default Profile
