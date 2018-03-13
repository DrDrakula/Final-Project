let defaultState = {chatRooms: []}

export default function root(state = defaultState, action){
  switch(action.type){
    case 'ALL_CHATROOMS':
      return {
        chatRooms: action.payload
      }
      break;
    case 'ADD_CHATROOM':
      return {
        chatRooms: [...state.chatRooms, action.payload]
      }
    default:
      return state
  }
}
