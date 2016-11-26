import { createAction } from 'redux-actions'

const addListingLocally = createAction('add listing')
const replaceListingsLocally = createAction('replace listings')
const deleteListingLocally = createAction('delete listing')
const editListingLocally = createAction('edit listing')
const updateListingLocally = createAction('update listing')

export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

export const addListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'add',
    data: listing,
  }
  return api.wrapPromise(api.addListing(listing), addListingLocally, req, dispatch)
}

export const updateListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'update',
    data: listing,
  }
  return api.wrapPromise(api.updateListing(listing), updateListingLocally, req, dispatch)
}

export const deleteListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'delete',
    data: listing,
  }
  return api.wrapPromise(api.deleteListing(listing), deleteListingLocally, req, dispatch)
}

export const editListing = (listing, field, value) => (dispatch, getState, api) => {
  const req = {
    type: 'edit',
    data: listing,
  }
  return api.wrapPromise(api.editListing(listing, field, value), editListingLocally, req, dispatch)
}

export const refreshListings = userId => (dispatch, getState, api) => {
  const req = {
    type: 'get listings',
    data: { id: 1 },
  }
  return api.wrapPromise(api.getListings(userId), replaceListingsLocally, req, dispatch)
}
