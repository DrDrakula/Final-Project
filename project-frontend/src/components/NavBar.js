import React from 'react'
import { connect } from 'react-redux'
import { logOut, leaveChatRoom } from '../actions'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  const onLogOutClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_id')
    localStorage.removeItem('chatroom_id')
    if(props.currentChatRoom){
      props.leaveChatRoom(props.currentChatRoom)
    }
    props.logOut()
  }
  return (
    <nav>
      <div className="nav-wrapper red darken-1">
        <div className="container">
          {props.loggedIn ? <NavLink className="right" onClick={props.leaveChatRoom} to="/">{localStorage.getItem('username')}</NavLink> : null}
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><NavLink to='/' onClick={props.leaveChatRoom}>Chatrooms</NavLink></li>
            <li>{props.loggedIn ? <NavLink to='/' onClick={onLogOutClick}>Log Out</NavLink> : <NavLink to='/'>Log In</NavLink>}</li>
          </ul>
        </div>
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

export default connect(mapStateToProps, {logOut, leaveChatRoom})(NavBar)
