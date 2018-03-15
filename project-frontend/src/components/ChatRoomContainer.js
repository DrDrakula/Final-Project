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
      console.log(props.match.params.slug)
      return cr.slug === props.match.params.slug
    })
    console.log(props.currentChatRoom)
    if (found && !props.currentChatRoom){
      console.log(found)
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
