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

export function enterChatRoom(chatRoom){
  console.log('Entering chatroom:', chatRoom.topic)
  return {
    type: 'ENTER_CHATROOM',
    payload: chatRoom
  }
}

export function leaveChatRoom(chatRoom){
  console.log('Leaving chatroom:', chatRoom.topic)
  return {
    type: 'LEAVE_CHATROOM'
  }
}

export function changeUrl(url){
  console.log('CHANGING URL')
  return {
    type: 'CHANGE_URL',
    payload: url
  }
}

export const getAllChatRooms = () => {
  return function(dispatch){
    fetch('http://localhost:3000/chatrooms')
    .then(res => res.json())
    .then(json => {
      console.log('Getting all ChatRooms',json)
      dispatch({
        type: 'GET_ALL_CHATROOMS',
        payload: json.chatrooms
      })
    })
  }
}

export const createChatRoom = (topic, password) => {
  return function(dispatch){
    fetch('http://localhost:3000/chatrooms', {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: topic,
        password: password
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log('Created:',json.chatroom)
      dispatch({
        type: 'CREATE_CHATROOM',
        payload: json.chatroom
      })
    })
  }
}

export const getAllMessages = (chatRoomId) => {
  return function(dispatch){
    fetch('http://localhost:3000/messages', {
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatroom_id: chatRoomId
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
  }
}
