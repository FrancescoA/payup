import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import listings from './listings'
import auth from './auth'

export default combineReducers({
  routing,
  listings,
  auth
})