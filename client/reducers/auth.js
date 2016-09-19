import { handleActions } from 'redux-actions'

import firebase from '../constants/firebase'
import auth from '../constants/firebase'
import { initialStateFromStorage } from '../helpers/localstorage'


const defaultAuthState = () => {
  return {
    auth: false,
    status: auth.DEFAULT,
    user: null
  }
}

export default handleActions({
  'log in attempt' (state, action) {
    return {...state, status: auth.LOGIN_PENDING}
  },
  'log in success' (state, action) {
    return {...state, 
      auth: true,
      status: auth.LOGIN_SUCCESS,
      user: action.payload
    }
  },
  'log in failure' (state, action) {
    return {...state, status: auth.LOGIN_FAILURE}
  },
  'log out attempt' (state, action) {
    return {...state, status: auth.LOGOUT_PENDING}
  },
  'log out success' (state, action) {
    return defaultAuthState()
  },
  'log out faiure' (state, action) {
    return {...state, status: auth.LOGOUT_FAILURE}
  }
}, initialStateFromStorage.auth || defaultAuthState())