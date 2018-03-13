import React from 'react'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import {allChatrooms, addChatRoom, logOut} from '../actions'

class ChatRooms extends React.Component {
  state = {
    rooms: [],
    chatRoomTopic: '',
    chatRoomPassword: ''
  }

  fetchAllRooms = () => {
    fetch('http://localhost:3000/chatrooms')
    .then(res => res.json())
    .then(json => {
      this.setState({
        rooms: json
      }, () => console.log(this.state.rooms))
    })
  }

  componentDidMount(){
    this.fetchAllRooms()
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

  handleSubmit = (event) => {
    event.preventDefault()
    this.createRoom(this.state.chatRoomTopic, this.state.chatRoomPassword)
  }

  createRoom = (topic, password) => {
    fetch('http://localhost:3000/chatrooms', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: topic,
        password: password
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        chatRoomTopic: '',
        chatRoomPassword: '',
        rooms: [...this.state.rooms, json]
      })
    })
  }

  handleLogOutButton = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.props.logOut()
  }

  render () {
    console.log(this.props)
    this.state.rooms.forEach(room => console.log(room))
    return(
      <div>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <label>Create a new room:</label><br/>
            <div className='row'>
              <div className="input-field col s6">
                <input type='text' onChange={this.handleTopicInput} value={this.state.chatRoomTopic} placeholder="Topic"/><br/>
              </div>
              <div className="input-field col s6">
                <input type='password' onChange={this.handlePasswordInput} value={this.state.chatRoomPassword} placeholder="Password"/><br/>
              </div>
            </div>
            <input type='submit' value='create room'/>
          </form>
        </div>
        <div>
          {this.state.rooms.map(room => <h5 key={room.id}>{room.topic}</h5>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRooms: state.chatRooms
  }
}


export default connect(mapStateToProps, {allChatrooms, addChatRoom, logOut})(ChatRooms);
