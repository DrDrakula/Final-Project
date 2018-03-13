export function allChatrooms(arr){
  console.log("ChatRooms",arr)
  return {
    type: "ALL_CHATROOMS",
    payload: arr
  }
}

export function addChatRoom(chatRoom){
  console.log("Adding ChatRoom", chatRoom)
  return {
    type: "ADD_CHATROOM",
    payload: chatRoom
  }
}

export function logIn(){
  console.log('Loging in')
  return {
    type: 'LOG_IN',
  }
}

export function logOut(){
  console.log('Loging out')
  return {
    type: 'LOG_OUT',
  }
}
