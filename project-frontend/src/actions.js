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
