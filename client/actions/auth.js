import { createAction } from 'redux-actions'

export const logInAttempt = createAction('log in attempt')
export const logInSuccess = createAction('log in success')
export const logInFailure = createAction('log in failure')

export const logOutAttempt = createAction('log out attempt')
export const logOutSuccess = createAction('log out success')
export const logOutFailure = createAction('log out failure')
