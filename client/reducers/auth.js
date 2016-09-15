import { handleActions } from 'redux-actions'
import firebase from '../constants/firebase'
import auth from '../constants/firebase'

const initialState = {
  auth: false,
  status: auth.DEFAULT,
  user: null
}

export default handleActions({
  'log in request' (state, action) {
    return {...state, status: auth.PENDING}
  },
  'log in success' (state, action) {
    return {...state, 
      auth: true,
      status: auth.SUCCESS,
      user: action.payload
    }
  },
  'log in failure' (state, action) {
    return {...state, status: auth.FAILURE}
  }
}, initialState)