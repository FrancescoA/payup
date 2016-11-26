import { createAction } from 'redux-actions'

export const addPendingRequest = createAction('add pending request')
export const removePendingRequest = createAction('remove pending request')

export const addFailedRequest = createAction('add failed request')
export const removeFailedRequest = createAction('remove failed request')
