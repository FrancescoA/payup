import { createAction } from 'redux-actions'

const addListingLocally = createAction('add listing')
const replaceListingsLocally = createAction('replace listings')
const deleteListingLocally = createAction('delete listing')
const editListingLocally = createAction('edit listing')
const updateListingLocally = createAction('update listing')
const replaceFileUrlsLocally = createAction('replace file urls')
const updateFileUrl = createAction('update file url')

export const addToLocalFileUrls = createAction('add url')
export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

export const deleteFileOfListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'delete file',
    data: listing,
  }
  return api.wrapPromise(api.deleteFileOfListing(listing), null, req, dispatch)
}

export const uploadNewFile = (userId, file) => (dispatch, getState, api) => {
  const req = {
    type: 'upload new file',
    data: { id: 1 },
  }
  return api.wrapPromise(api.uploadNewFile(userId, file), updateFileUrl, req, dispatch)
}

export const addListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'add listing',
    data: listing,
  }
  return api.wrapPromise(api.addListing(listing), addListingLocally, req, dispatch)
}

export const updateListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'update listing',
    data: listing,
  }
  return api.wrapPromise(api.updateListing(listing), updateListingLocally, req, dispatch)
}

export const deleteListing = listing => (dispatch, getState, api) => {
  const req = {
    type: 'delete listing',
    data: listing,
  }
  return api.wrapPromise(
    api.deleteListingAndFile(listing),
    deleteListingLocally,
    req,
    dispatch)
}

export const editListing = (listing, field, value) => (dispatch, getState, api) => {
  const req = {
    type: 'edit listing',
    data: listing,
  }
  return api.wrapPromise(api.editListing(listing, field, value), editListingLocally, req, dispatch)
}

export const refreshListings = userId => (dispatch, getState, api) => {
  const req = {
    type: 'get listings',
    data: { id: 1 },
  }

  return api.wrapPromise(Promise.all([api.getListings(userId), api.getFileUrls(userId)])
    .then((values) => {
      const listings = values[0]
      const urlMapping = values[1]
      dispatch(replaceFileUrlsLocally(urlMapping))
      dispatch(replaceListingsLocally(listings))
    }), null, req, dispatch)
}
