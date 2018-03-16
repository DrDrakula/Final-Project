import React from 'react'
import { connect } from 'react-redux'
import Cable from 'actioncable'
import { leaveChatRoom } from '../actions'
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
      console.log(json)
      console.log(json.messages)
      this.setState({
        roomsMessages: json.messages.filter(message => message.chatroom.id === this.props.currentChatRoom.id)
      }, () => {
        let element = document.getElementById("chatList");
        element.scrollTop = element.scrollHeight;
        console.log(this.state.roomsMessages)
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

  componentWillMount() {
    this.createSocket();
  }

  componentDidMount(){
    localStorage.setItem('chatroom_id', this.props.currentChatRoom.id)
    this.getAllMessages(this.props.currentChatRoom.id)
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create({
      channel: 'MessagesChannel',
    }, {
      connected: () => {},
      received: (data) => {
        if(data.chatroom_id === this.props.currentChatRoom.id){
          let roomsMessages = this.state.roomsMessages
          roomsMessages.push(data)
          this.setState({ roomsMessages: roomsMessages })
          let element = document.getElementById("chatList");
          element.scrollTop = element.scrollHeight;
          console.log(data);
        }
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent,
          user_id: localStorage.getItem('user_id'),
          chatroom_id: localStorage.getItem('chatroom_id')
        });
      }
    });
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
    return (
      <div>
        <div>
          <h5 className='App'>{this.props.currentChatRoom.topic}</h5>
          {this.state.approved ?
          <div className='row'>
            <div className='col s8'>
              <img alt='yt' className='responsive-img' src={require('../yt.jpg')} height='500'/>
            </div>
            <div className='col s4' id='chatList'>
              <ul>
                {this.state.roomsMessages.map(message => <li key={message.id}><strong>{message.username ? message.username : message.user.username}:</strong> {message.content}</li>)}
              </ul>
            </div>
            <div className='col s4' id='messageInput'>
              <form onSubmit={(e) => this.handleSendEvent(e)}>
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
