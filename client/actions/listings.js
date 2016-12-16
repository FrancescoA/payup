import { createAction } from 'redux-actions'
import * as requestType from '../constants/requests'

const addListingLocally = createAction('add listing')
const replaceListingsLocally = createAction('replace listings')
const deleteListingLocally = createAction('delete listing')
const editListingLocally = createAction('edit listing')
const updateListingLocally = createAction('update listing')
const replaceFileUrlsLocally = createAction('replace file urls')
const updateFileUrl = createAction('update file url')
const setFileLoadingState = createAction('set file loading state')

export const addToLocalFileUrls = createAction('add url')
export const completeListing = createAction('complete listing')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')

export const deleteFileOfListing = listing => (dispatch, getState, api) => {
  const req = {
    type: requestType.DELETE_FILE,
    data: listing,
  }
  return api.wrapPromise(api.deleteFileOfListing(listing), null, req, dispatch)
}

export const uploadNewFile = (userId, file) => (dispatch, getState, api) => {
  const req = {
    type: requestType.UPLOAD_NEW_FILE,
    data: { id: 1 },
  }
  dispatch(setFileLoadingState({ isUploading: true, percentage: 0 }))
  return api.wrapPromise(api.uploadNewFile(userId, file, (progress) => {
    dispatch(setFileLoadingState({ isUploading: true, percentage: progress }))
  }), updateFileUrl, req, dispatch)
  .then((data) => {
    dispatch(setFileLoadingState({ isUploading: false, percentage: 0 }))
    return data
  })
}

export const addListing = listing => (dispatch, getState, api) => {
  const req = {
    type: requestType.ADD_LISTING,
    data: listing,
  }
  return api.wrapPromise(api.addListing(listing), addListingLocally, req, dispatch)
}

export const updateListing = listing => (dispatch, getState, api) => {
  const req = {
    type: requestType.UPDATE_LISTING,
    data: listing,
  }
  return api.wrapPromise(api.updateListing(listing), updateListingLocally, req, dispatch)
}

export const deleteListing = listing => (dispatch, getState, api) => {
  const req = {
    type: requestType.DELETE_LISTING,
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
    type: requestType.EDIT_LISTING,
    data: listing,
  }
  return api.wrapPromise(api.editListing(listing, field, value), editListingLocally, req, dispatch)
}

export const refreshListings = userId => (dispatch, getState, api) => {
  const req = {
    type: requestType.GET_LISTINGS,
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
