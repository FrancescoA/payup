import { createAction } from 'redux-actions'

export const addListingPending = createAction('add listing pending')
export const deleteListingPending = createAction('delete listing pending')
export const deleteListingFailure = createAction('delete listing failure')

export const editListingPending = createAction('edit listing pending')
// export const editListingFailure = createAction('edit listing failure')


export const addListingLocal = createAction('add listing')
export const deleteListing = createAction('delete listing')
export const editListing = createAction('edit listing')
export const updateListing = createAction('update listing')

export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')


export const addListing = listing => (dispatch, getState, api) => {
  dispatch(addListingPending(listing))
  return api.addListing(listing).then(() => dispatch(addListingLocal(listing)))
}
