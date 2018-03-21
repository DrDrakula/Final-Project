let defaultState = {chatRooms: [], loggedIn: false, currentChatRoom: null, url: ''}

const GET_ALL_CHATROOMS = 'GET_ALL_CHATROOMS'
const CREATE_CHATROOM = 'CREATE_CHATROOM'
const ENTER_CHATROOM = 'ENTER_CHATROOM'
const LEAVE_CHATROOM = 'LEAVE_CHATROOM'
const CHANGE_URL = 'CHANGE_URL'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

export default function root(state = defaultState, action){

  switch(action.type){

    case GET_ALL_CHATROOMS:
      return {
        ...state, chatRooms: action.payload
      }

      case CREATE_CHATROOM:
      return {
        ...state, chatRooms: [...state.chatRooms, action.payload]
      }

    case ENTER_CHATROOM:
      return {
        ...state, currentChatRoom: action.payload
      }

    case LEAVE_CHATROOM:
      return {
        ...state, currentChatRoom: null
      }

    case LOG_IN:
      return {...state, loggedIn: true}

    case LOG_OUT:
      return {...state, loggedIn: false}

    case CHANGE_URL:
      return {...state, url: action.payload}

    default:
      return state
  }
}
