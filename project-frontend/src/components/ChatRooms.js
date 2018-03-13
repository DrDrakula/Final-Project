import React from 'react'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import {allChatrooms, addChatRoom, logOut} from '../actions'

class ChatRooms extends React.Component {
  state = {
    rooms: [],
    chatRoomTopic: '',
    chatRoomPassword: '',
    filterRooms: ''
  }

  fetchAllRooms = () => {
    fetch('http://localhost:3000/chatrooms')
    .then(res => res.json())
    .then(json => {
      this.setState({
        rooms: json.chatrooms
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

  handleFilterInput = (event) => {
    this.setState({
      filterRooms: event.target.value
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
      console.log(json.chatroom)
      this.setState({
        chatRoomTopic: '',
        chatRoomPassword: '',
        rooms: [...this.state.rooms, json.chatroom]
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

    let sortedRooms = this.state.rooms.sort((a,b) => a.topic.localeCompare(b.topic))
    let filteredRooms = sortedRooms.filter(room => room.topic.toLowerCase().includes(this.state.filterRooms.toLowerCase()))
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
          <input type='text' value={this.state.filterRooms} onChange={this.handleFilterInput} placeholder='Search for rooms'/>
        </div>
        <div>
          {this.state.rooms ? filteredRooms.map(room => <h5 key={room.id}>{room.topic}</h5>) : null}
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
