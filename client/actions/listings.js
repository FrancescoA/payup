import { createAction } from 'redux-actions'

const addListingPending = createAction('add listing pending')
const deleteListingPending = createAction('delete listing pending')
// const deleteListingFailure = createAction('delete listing failure')
const editListingPending = createAction('edit listing pending')
// const editListingFailure = createAction('edit listing failure')

const addListingLocally = createAction('add listing')
const deleteListingLocally = createAction('delete listing')
const editListingLocally = createAction('edit listing')
const updateListingLocally = createAction('update listing')

export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

export const addListing = listing => (dispatch, getState, api) => {
  dispatch(addListingPending(listing))
  return api.addListing(listing).then(() => dispatch(addListingLocally(listing)))
}

export const updateListing = listing => (dispatch, getState, api) => {
  dispatch(editListingPending(listing))
  return api.updateListing(listing).then(() => dispatch(updateListingLocally(listing)))
}

export const deleteListing = listing => (dispatch, getState, api) => {
  dispatch(deleteListingPending(listing))
  return api.deleteListing(listing).then(() => dispatch(deleteListingLocally(listing)))
}

export const editListing = (listing, field, value) => (dispatch, getState, api) => {
  const { id } = listing
  dispatch(editListingPending(listing))
  return api.editListing(listing, field, value).then(() => {
    dispatch(editListingLocally({ id, field, value }))
  })
}
