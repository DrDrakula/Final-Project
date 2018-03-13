let defaultState = {chatRooms: [], loggedIn: false}

const ALL_CHATROOMS = 'ALL_CHATROOMS'
const ADD_CHATROOM = 'ADD_CHATROOM'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

export default function root(state = defaultState, action){

  switch(action.type){

    case ALL_CHATROOMS:
      return {
        ...state, chatRooms: action.payload
      }

      case ADD_CHATROOM:
      return {
        ...state, chatRooms: [...state.chatRooms, action.payload]
      }

    case LOG_IN:
      return {...state, loggedIn: true}

    case LOG_OUT:
      return {...state, loggedIn: false}

    default:
      return state
  }
}
