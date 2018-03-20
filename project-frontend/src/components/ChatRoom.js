import React from 'react'
import { connect } from 'react-redux'
import { leaveChatRoom } from '../actions'
import { ActionCable } from 'react-actioncable-provider'
import CurrentVideo from './CurrentVideo'

class ChatRoom extends React.Component{

  state = {
    roomsMessages: [],
    input: '',
    passwordInput: '',
    approved: true
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
    this.getAllMessages(this.props.currentChatRoom.id)

  }

  handleSocketResponse = (data) => {

    switch (data.type) {
      case 'ADD_MESSAGE':
        console.log(data)
        let roomsMessages = this.state.roomsMessages
        roomsMessages.push(data.payload)
  			this.setState({roomsMessages: roomsMessages})
     		break;
      case 'CONTROL_VIDEO':
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
      this.setState({
        approved: true,
        passwordInput: ''
      })
    }
  }


  render(){
    //<img alt='yt' className='responsive-img' src={require('../yt.jpg')} height='500'/>
    // <iframe height='500' width='900' title='*Try Not To Laugh Challenge* Funny Dogs Compilation - Funniest Dog Videos 2017' src={`https://www.youtube.com/embed/aEzZLXBH3rU`}/>
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
              </div>
            <div className='col s4' id='chatList'>
                <ul>
                  {this.state.roomsMessages.map(message => <li key={message.id}><strong>{message.username ? message.username : message.user.username}:</strong> {message.content}</li>)}
                </ul>
              </div>
              <div className='col s4' id='messageInput'>
                <form onSubmit={(e) => this.sendMesssage(e)}>
                  <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Type here...'/>
                  <input type='submit' value='Send Message'/>
                </form>
              </div>
            </div>
          :
            <form onSubmit={this.handleJoinRoom}>
              <input type='password' placeholder='Password' value={this.state.passwordInput} onChange={this.handlePasswordInput}/>
              <input type='submit' value='Join'/>
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
