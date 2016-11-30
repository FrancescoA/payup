import { createAction } from 'redux-actions'
import * as loadingState from './loadingState'

const logInLocally = createAction('log in')
const logOutLocally = createAction('log out')

export const facebookLogIn = () => (dispatch, getState, api) => {
  const req = {
    type: 'facebook log in',
    data: { id: 1 }, // id doesn't really matter in this case
  }
  dispatch(loadingState.addPendingRequest(req))
  return api.signInWithFacebook()
    .then(({ user }) => api.updateUser(user))
    .then(user => dispatch(logInLocally(user)))
    .then(() => dispatch(loadingState.removePendingRequest(req)))
    .catch(() => {
      dispatch(loadingState.removePendingRequest(req))
      dispatch(loadingState.addFailedRequest(req))
    })
}

export const logOut = () => (dispatch, getState, api) => {
  const req = {
    type: 'log out',
    data: { id: 1 }, // id doesn't really matter in this case
  }
  return api.wrapPromise(api.logOut(), logOutLocally, req, dispatch)
}
