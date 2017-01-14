import React from 'react'
import Title from './Title'
import Avatar from './Avatar'

const Profile = (props) => <div>
  <div><Avatar src={props.src} /></div>
  <div><Title>{props.children}</Title></div>
</div>

Profile.__PIGMENT_META = {
  file: 'Profile.js',
  dependencies: ['Avatar.js', 'Title.js']
}

export default Profile
