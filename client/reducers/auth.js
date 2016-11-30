import { handleActions } from 'redux-actions'

import { initialStateFromStorage } from '../helpers/localstorage'


const defaultAuthState = () => {
  return {
    auth: false,
    user: null,
    fileIdToURL: {},
  }
}

export default handleActions({
  'log in': (state, action) => {
    return {
      ...state,
      auth: true,
      user: action.payload,
    }
  },
  'log out': (state, action) => {
    return defaultAuthState()
  },
  'update urls': (state, action) => {
    return {
      ...state,
      fileIdToURL: action.payload,
    }
  },
  'update url': (state, action) => {
    const { key, value } = action.payload
    const stateCopy = Object.assign({}, state)
    stateCopy.fileIdToURL[key] = value
    return stateCopy
  },
}, initialStateFromStorage.auth || defaultAuthState())
