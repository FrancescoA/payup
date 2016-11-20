import { createAction } from 'redux-actions'
import * as loadingState from './loadingState'

const logInLocally = createAction('log in')

export const logOutAttempt = createAction('log out attempt')
export const logOutSuccess = createAction('log out success')
export const logOutFailure = createAction('log out failure')


export const facebookLogIn = () => (dispatch, getState, api) => {
  const req = {
    type: 'facebook log in',
    data: { id: 1 }, // id doesn't really matter in this case
  }
  dispatch(loadingState.addPendingRequest(req))
  return api.signInWithFacebook()
    .then(({ user }) => api.setUser(user))
    .then(user => dispatch(logInLocally(user)))
    .then(() => dispatch(loadingState.removePendingRequest(req)))
    .catch(() => {
      dispatch(loadingState.removePendingRequest(req))
      dispatch(loadingState.addFailedRequest(req))
    })
}
