import React from 'react'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import {getAllChatRooms, createChatRoom, logOut, enterChatRoom} from '../actions'

class ChatRooms extends React.Component {
  state = {
    chatRoomTopic: '',
    chatRoomPassword: '',
    filterRooms: ''
  }

  componentDidMount(){
    this.props.getAllChatRooms()
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
    console.log(this.props)
    let sortedRooms = this.props.chatRooms.sort((a,b) => a.topic.localeCompare(b.topic))
    let filteredRooms = sortedRooms.filter(room => room.topic.toLowerCase().includes(this.state.filterRooms.toLowerCase()))
    return(
      <div>
        {!this.props.currentChatRoom ?
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
          <div>
            {this.props.chatRooms ? filteredRooms.map(room => <h5 onClick={() => this.props.enterChatRoom(room)} key={room.id}>{room.topic}</h5>) : null}
          </div>
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

export default connect(mapStateToProps, {getAllChatRooms, createChatRoom, logOut, enterChatRoom})(ChatRooms);
