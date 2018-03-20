import React from 'react'
import { enterChatRoom, leaveChatRoom } from '../actions'
import { connect } from 'react-redux'
import ChatRoom from './ChatRoom'

class ChatRoomContainer extends React.Component {

  componentDidMount(){
    this.checkIfFound(this.props)
  }
  componentWillReceiveProps(nextProps){
    this.checkIfFound(nextProps)
  }

  checkIfFound = (props) => {
    let found = props.chatRooms.find(cr => {
      return cr.slug === props.match.params.slug
    })
    if (found && !props.currentChatRoom){
      this.props.enterChatRoom(found)
    }
  }


  render () {

    let comp;


    if (this.props.currentChatRoom && (this.props.currentChatRoom.slug === this.props.match.params.slug)){
      comp = <ChatRoom {...this.props}/>
    } else {
      comp = <h1>LOADING</h1>
    }

    return comp
  }

  componentWillUnmoun(){
    this.props.leaveChatRoom()
  }
}
function mapStateToProps (state){
  return {
    currentChatRoom: state.currentChatRoom,
    chatRooms: state.chatRooms
  }
}
export default connect(mapStateToProps, {enterChatRoom, leaveChatRoom})(ChatRoomContainer);
