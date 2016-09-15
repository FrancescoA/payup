import { createAction } from 'redux-actions'

export const logInAttempt = createAction('log in request')
export const logInSuccess = createAction('log in success')
export const logInFailure = createAction('log in failure')