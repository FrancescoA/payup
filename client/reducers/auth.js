import { handleActions } from 'redux-actions'

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
  'log out': (state, action) => {
    return defaultAuthState()
  },
}, initialStateFromStorage.auth || defaultAuthState())
