import React from 'react'
import { connect } from 'react-redux'

class ChatRoom extends React.Component{

  state = {
    roomsMessages: [],
    input: ''
  }

  getAllMessages = (chatRoomId) => {
    fetch('http://localhost:3000/messages')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      console.log(json.messages)
      this.setState({
        roomsMessages: json.messages.filter(message => message.chatroom.id === this.props.currentChatRoom.id)
      }, () => console.log(this.state.roomsMessages))
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  sendMessage = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: this.state.input,
        user_id: localStorage.getItem('user_id'),
        chatroom_id: this.props.currentChatRoom.id
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json.message)
      this.setState({
        input: '',
        roomsMessages: [...this.state.roomsMessages, json.message]
      })
    })
  }

  componentDidMount(){
    this.getAllMessages(this.props.currentChatRoom.id)
  }

  render(){

    return (
      <div>
        <h5>{this.props.currentChatRoom.topic}</h5>
        <div>
          <ul>
            {this.state.roomsMessages.map(message => <li key={message.id}><strong>{message.user.username}:</strong> {message.content}</li>)}
          </ul>
        </div>
        <div>
          <form onSubmit={this.sendMessage}>
            <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Type here...'/>
            <input type='submit'/>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentChatRoom: state.currentChatRoom
  }
}

export default connect(mapStateToProps)(ChatRoom)
