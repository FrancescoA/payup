import { createAction } from 'redux-actions'
import * as loadingState from './loadingState'

const addListingLocally = createAction('add listing')
const deleteListingLocally = createAction('delete listing')
const editListingLocally = createAction('edit listing')
const updateListingLocally = createAction('update listing')

export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

const wrapPromise = (promise, req, dispatch, successAction) => {
  dispatch(loadingState.addPendingRequest(req))
  return promise.then(() => dispatch(loadingState.removePendingRequest(req)))
    .then(
      () => dispatch(successAction),
      () => dispatch(loadingState.addFailedRequest(req))
    )
}

export const addListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'add',
    data: listing,
  }
  return wrapPromise(api.addListing(listing), req, dispatch, addListingLocally(listing))
}

export const updateListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'update',
    data: listing,
  }
  return wrapPromise(api.updateListing(listing), req, dispatch, updateListingLocally(listing))
}

export const deleteListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'delete',
    data: listing,
  }
  return wrapPromise(api.deleteListing(listing), req, dispatch, deleteListingLocally(listing))
}

export const editListing = (listing, field, value) => (dispatch, getState, api) => {
  const { id } = listing
  const req = {
    type: 'edit',
    data: listing,
  }
  return wrapPromise(api.editListing(listing, field, value),
    req, dispatch, editListingLocally({ id, field, value }))
}
