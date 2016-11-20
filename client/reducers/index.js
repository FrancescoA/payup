import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import listings from './listings'
import auth from './auth'
import loadingState from './loadingState'

export default combineReducers({
  routing,
  listings,
  auth,
  loadingState,
})
