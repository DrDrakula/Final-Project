import React from 'react'
import PropTypes from 'prop-types'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import {allChatrooms, addChatRoom} from '../actions'

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

  render () {
    console.log(this.props)
    return(
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Create a new room:</label><br/>
            <input type='text' onChange={this.handleTopicInput} value={this.state.chatRoomTopic} placeholder="Topic"/><br/>
            <input type='password' onChange={this.handlePasswordInput} value={this.state.chatRoomPassword} placeholder="Password"/><br/>
            <input type='submit' value='create room'/>
          </form>
        </div>
        <div>
          {this.state.rooms.map(room => <div key={room.id}><ChatRoom room={room} /></div>)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addChatRoom: (room) => dispatch(addChatRoom(room)),
    allChatrooms: (arr) => dispatch(allChatrooms(arr))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);
