import React from 'react'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import { createChatRoom, logOut } from '../actions'
import {NavLink} from 'react-router-dom'


class ChatRooms extends React.Component {
  state = {
    chatRoomTopic: '',
    chatRoomPassword: '',
    filterRooms: ''
  }

  handlePasswordInput = (event) => {
    this.setState({
      chatRoomPassword: event.target.value
    })
  }

  handleTopicInput = (event) => {
    this.setState({
      chatRoomTopic: event.target.value
    })
  }

  handleFilterInput = (event) => {
    this.setState({
      filterRooms: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createChatRoom(this.state.chatRoomTopic, this.state.chatRoomPassword)
    this.setState({
      chatRoomTopic: '',
      chatRoomPassword: ''
    })
  }


  handleLogOutButton = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.props.logOut()
  }

  render () {
    let sortedRooms = this.props.chatRooms.sort((a,b) => a.topic.localeCompare(b.topic))
    let filteredRooms = sortedRooms.filter(room => room.topic.toLowerCase().includes(this.state.filterRooms.toLowerCase()))
    return(
      <div>
        {!this.props.currentChatRoom ?
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h5 className="App">Create a new ChatRoom</h5><br/>
            <span id='error-field'></span>
            <div className='row'>
              <div className="input-field col s6">
                <input type='text' onChange={this.handleTopicInput} value={this.state.chatRoomTopic} placeholder="Topic"/><br/>
              </div>
              <div className="input-field col s6">
                <input type='password' onChange={this.handlePasswordInput} value={this.state.chatRoomPassword} placeholder="Password (optional)"/><br/>
              </div>
            </div>
            <input type='submit' className="waves-effect waves-light btn red darken-1" value='create room'/>
          </form>
          <br/>
          <h5 className="App">Join an existing ChatRoom</h5>
          <input type='text' className="App" value={this.state.filterRooms} onChange={this.handleFilterInput} placeholder='Search for rooms'/>
          <ul className='collection App'>
            {this.props.chatRooms ? filteredRooms.map(room => <li className='collection-item' key={room.id}><NavLink to={`/chatrooms/${room.slug}`}>{room.topic}</NavLink></li>) : null}
          </ul>
        </div>
      :
      <ChatRoom />
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRooms: state.chatRooms,
    currentChatRoom: state.currentChatRoom
  }
}

export default connect(mapStateToProps, {createChatRoom, logOut})(ChatRooms);
