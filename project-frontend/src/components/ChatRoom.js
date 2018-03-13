import React from 'react'
import PropTypes from 'prop-types'

const ChatRoom = (props) => {
  return (
    <div>
      <h1>{props.room.topic}</h1>
    </div>
  )
}

export default ChatRoom
