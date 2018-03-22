import React from 'react'
import { connect } from 'react-redux'
import { leaveChatRoom } from '../actions'
import { ActionCable } from 'react-actioncable-provider'
import CurrentVideo from './CurrentVideo'
import YouTubeVideoContainer from './YouTubeVideoContainer'

class ChatRoom extends React.Component{

  state = {
    roomsMessages: [],
    input: '',
    passwordInput: '',
    approved: false
  }

  getAllMessages = (chatRoomId) => {
    fetch('http://localhost:3000/messages')
    .then(res => res.json())
    .then(json => {
      this.setState({
        roomsMessages: json.messages.filter(message => message.chatroom.id === this.props.currentChatRoom.id)
      }, () => {
        let element = document.getElementById("chatList");
        element.scrollTop = element.scrollHeight;
      })
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handlePasswordInput = (event) => {
    this.setState({
      passwordInput: event.target.value
    })
  }

  componentDidMount(){
    localStorage.setItem('chatroom_id', this.props.currentChatRoom.id)
    if(localStorage.getItem('chatroom_password') || !this.props.currentChatRoom.password){
      this.setState({approved: true},() => this.getAllMessages(this.props.currentChatRoom.id))
    }
  }

  handleSocketResponse = (data) => {

    switch (data.type) {
      case 'ADD_MESSAGE':
        console.log(data)
        let roomsMessages = this.state.roomsMessages
        roomsMessages.push(data.payload)
  			this.setState({roomsMessages: roomsMessages})
        let element = document.getElementById("chatList");
        element.scrollTop = element.scrollHeight;
     		break;
      default:
        console.log(data);
    }
  };

  sendMesssage = (event) => {
    event.preventDefault()
		fetch(`http://localhost:3000/chatrooms/${this.props.currentChatRoom.id}/add_message`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				content: this.state.input,
				user_id: localStorage.getItem('user_id'),
        chatroom_id: this.props.currentChatRoom.id
			})
		})
		.then(res => res.json())
    .then(json => {
			this.setState({
				input: ""
			},() => {
        let element = document.getElementById("chatList");
        element.scrollTop = element.scrollHeight;
      })
		})
	}

  handleSendEvent = (event) => {
    event.preventDefault();
    this.chats.create(this.state.input);
    this.setState({
      input: ''
    });
  }

  handleJoinRoom = (event) => {
    event.preventDefault()
    if(this.state.passwordInput === this.props.currentChatRoom.password){
      localStorage.setItem('chatroom_password', this.state.passwordInput)
      this.setState({
        approved: true,
        passwordInput: ''
      }, () => {
        this.getAllMessages(this.props.currentChatRoom.id)
      })
    }
  }


  render(){
      return (
      <div>
        <ActionCable
          channel={{ channel: 'ChatroomChannel', chatroom_id: this.props.currentChatRoom.id }}
          onReceived={this.handleSocketResponse}
        />
        <div>
          <h5 className='App'>{this.props.currentChatRoom.topic}</h5>
          {this.state.approved ?
            <div className='row'>
              <div className='col s8'>
                <CurrentVideo />
                <YouTubeVideoContainer />
              </div>
            <div className='col s4' id='chatList'>
              <ul>
                {this.state.roomsMessages.map(message => <li key={message.id}><strong>{message.username ? message.username : message.user.username}:</strong> {message.content}</li>)}
              </ul>
            </div>
            <div className='col s4' id='messageInput'>
              <form onSubmit={(e) => this.sendMesssage(e)}>
                <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Type here...'/>
                <input type='submit' value='Send Message' className="waves-effect waves-light btn red darken-1"/>
              </form>
            </div>
          </div>
          :
          <form className='App' onSubmit={this.handleJoinRoom}>
            <input type='password' placeholder='Password' value={this.state.passwordInput} onChange={this.handlePasswordInput}/>
            <input type='submit' className="waves-effect waves-light btn red darken-1" value='Join'/>
          </form>
        }
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

export default connect(mapStateToProps, {leaveChatRoom})(ChatRoom)
