import React from 'react'
import { connect } from 'react-redux'
import { logOut, leaveChatRoom } from '../actions'

const NavLink = (props) => {
  const onLogOutClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_id')
    localStorage.removeItem('chatroom_id')
    props.leaveChatRoom(props.currentChatRoom)
    props.logOut()
  }
  console.log(props)
  return (
    <nav>
      <div className="nav-wrapper">
        {props.loggedIn ? <a className="brand-logo right">{localStorage.getItem('username')}</a> : null}
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><a>Sass</a></li>
          <li><a>Components</a></li>
          <li>{props.loggedIn ? <a onClick={onLogOutClick}>Log Out</a> : <a>Log In</a>}</li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    currentChatRoom: state.currentChatRoom
  }
}

export default connect(mapStateToProps, {logOut, leaveChatRoom})(NavLink)
