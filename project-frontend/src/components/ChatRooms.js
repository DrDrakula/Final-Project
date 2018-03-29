import React from 'react'
import ChatRoom from './ChatRoom'
import {connect} from 'react-redux'
import { createChatRoom, logOut, deleteChatRoom } from '../actions'
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
        {
          !this.props.currentChatRoom
          ?
          <div className='container chatroom-hub'>

            <div className="row">

              <div className="col s6">
                <h5>Create a new chat room</h5><br/>
                  <div className='row'>
                    <form onSubmit={this.handleSubmit}>
                      <span id='error-field'></span>

                        <div className="input-field col s6">
                          <input type='text' onChange={this.handleTopicInput} value={this.state.chatRoomTopic} placeholder="Topic"/><br/>
                          <input type='password' onChange={this.handlePasswordInput} value={this.state.chatRoomPassword} placeholder="Password (optional)"/><br/><br/>
                          <input type='submit' className="waves-effect waves-light btn red darken-1" value='create room'/>
                      </div>

                    </form>
                  </div>
              </div>

              <div className="col s6">
                <h5>Join an existing chat room</h5><br/>
                  <div className='row'>
                    <div className="input-field col s12">
                      <input type='text' value={this.state.filterRooms} onChange={this.handleFilterInput} placeholder='Search for chat rooms'/>
                      <ul className='collection'>
                        {this.props.chatRooms ? filteredRooms.map(room => <li className='collection-item' key={room.id}><NavLink to={`/chatrooms/${room.slug}`}>{room.topic}</NavLink><a className='secondary-content' ><i onClick={() => this.props.deleteChatRoom(room)} className='material-icons'>delete_forever</i></a></li>) : null}
                      </ul>
                    </div>
                  </div>
              </div>
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

export default connect(mapStateToProps, {createChatRoom, logOut, deleteChatRoom})(ChatRooms);

// <div className="row">
//   <div className="col s6">
//     <h5>Create a new chat room</h5><br/>
//     <div className='row'>
//       <form onSubmit={this.handleSubmit}>
//         <span id='error-field'></span>
//
//           <div className="input-field col s6">
//             <input type='text' onChange={this.handleTopicInput} value={this.state.chatRoomTopic} placeholder="Topic"/><br/>
//             <input type='password' onChange={this.handlePasswordInput} value={this.state.chatRoomPassword} placeholder="Password (optional)"/><br/>
//             <input type='submit' className="waves-effect waves-light btn red darken-1" value='create room'/>
//         </div>
//
//       </form>
//     </div>
//   </div>
//   <div className="col s6">
//     <h5>Join an existing chat room</h5><br/>
//     <div className="row">
//       <input type='text' value={this.state.filterRooms} onChange={this.handleFilterInput} placeholder='Search for chat rooms'/>
//       <ul className='collection'>
//         {this.props.chatRooms ? filteredRooms.map(room => <li className='collection-item' key={room.id}><NavLink to={`/chatrooms/${room.slug}`}>{room.topic}</NavLink><a className='secondary-content' ><i onClick={() => this.props.deleteChatRoom(room)} className='material-icons'>delete_forever</i></a></li>) : null}
//       </ul>
//     </div>
//   </div>
// </div>
