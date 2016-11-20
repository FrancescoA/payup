import { handleActions } from 'redux-actions'

import * as auth from '../constants/auth'
import { initialStateFromStorage } from '../helpers/localstorage'


const defaultAuthState = () => {
  return {
    auth: false,
    user: null,
  }
}

export default handleActions({
  'log in': (state, action) => {
    return {
      auth: true,
      user: action.payload,
    }
  },
  'log out attempt': (state, action) => {
    return { ...state, status: auth.LOGOUT_PENDING }
  },
  'log out success': (state, action) => {
    return defaultAuthState()
  },
  'log out faiure': (state, action) => {
    return { ...state, status: auth.LOGOUT_FAILURE }
  },
}, initialStateFromStorage.auth || defaultAuthState())
