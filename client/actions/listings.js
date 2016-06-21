
import { createAction } from 'redux-actions'

export const addListing = createAction('add listing')
export const deleteListing = createAction('delete listing')
export const editListing = createAction('edit listing')
export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')
