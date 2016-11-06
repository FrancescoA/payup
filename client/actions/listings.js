import { createAction } from 'redux-actions'

// export const addListingPending = createAction('add listing pending')
export const addListingFailure = createAction('add listing failure')
export const addListingSuccess = createAction('add listing success')

export const deleteListingPending = createAction('delete listing pending')
export const deleteListingFailure = createAction('delete listing failure')

export const editListingPending = createAction('edit listing pending')
export const editListingFailure = createAction('edit listing failure')

export const addListing = createAction('add listing')
export const deleteListing = createAction('delete listing')
export const editListing = createAction('edit listing')
export const bulkEditListing = createAction('bulk edit listing')

export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')
