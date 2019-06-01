import axios from 'axios'
import { combineReducers } from 'redux'
import { navigate } from 'gatsby'

const API = 'https://api.glweems.com'

const initialState = {
  loggingIn: false,
  errorMsg: '',
  successMsg: '',
}

const body = {
  firstname: 'Jesse',
  lastname: 'Pinkman',
}

const LOGIN_START = 'LOGIN_START'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_START })
  return axios
    .post(`${API}/messages`, { ...body, email, body: password })
    .then(res => {
      console.log('TCL: res', res)

      localStorage.setItem('token', res.data._id)
      dispatch({ type: LOGIN_SUCCESS, payload: 'Success' })
      dispatch({ type: LOGGED_IN })
      navigate('/')
    })
    .catch(err =>
      dispatch({ type: LOGIN_FAILURE, payload: 'Problem logging in' })
    )
}

export const logout = () => dispatch => {
  dispatch({ type: LOGGED_OUT })
  return localStorage.removeItem('token')
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loggingIn: true }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        errorMsg: '',
        successMsg: action.payload,
      }

    case LOGIN_FAILURE:
      return { ...state, errorMsg: action.payload, loggingIn: false }

    default:
      return state
  }
}

const initialAuthState = {
  loggedIn: localStorage.getItem('username') !== null,
}

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, loggedIn: true }

    case LOGGED_OUT:
      return { ...state, loggedIn: false }

    default:
      return state
  }
}

export default combineReducers({
  auth: authReducer,
  login: loginReducer,
})

// export const login = creds => dispatch => {
//   dispatch({ type: LOGIN_START })
//   return axios
//     .post('http://localhost:5000/api/login', creds)
//     .then(res => {
//       localStorage.setItem('token', res.data.payload)
//       dispatch({ type: LOGIN_SUCCESS, payload: res.data })
//       getFriends(dispatch)
//     })
//     .catch(err => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: 'You have an error logging in',
//       })
//     })
// }

// const initialState = {
//   deletingFriend: false,
//   fetchingFriends: false,
//   friends: [],
//   loggingIn: false,
//   savingFriends: false,
//   updatingFriend: false,
//   error: null,
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_START:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: false,
//         friends: [],
//         loggingIn: true,
//         savingFriends: false,
//         updatingFriend: false,
//         error: null,
//       }
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: false,
//         friends: action.payload,
//         loggingIn: false,
//         savingFriends: false,
//         updatingFriend: false,
//         error: null,
//       }
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: false,
//         friends: [],
//         loggingIn: false,
//         savingFriends: false,
//         updatingFriend: false,
//         error: action.payload,
//       }

//     case GET_FRIENDS_START:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: true,
//         friends: [],
//         loggingIn: false,
//         savingFriends: false,
//         updatingFriend: false,
//         error: null,
//       }

//     case GET_FRIENDS_SUCCESS:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: false,
//         friends: action.payload,
//         loggingIn: false,
//         savingFriends: false,
//         updatingFriend: false,
//         error: null,
//       }

//     case GET_FRIENDS_FAILURE:
//       return {
//         ...state,
//         deletingFriend: false,
//         fetchingFriends: false,
//         friends: [],
//         loggingIn: false,
//         savingFriends: false,
//         updatingFriend: false,
//         error: action.payload,
//       }

//     default:
//       return state
//   }
// }
