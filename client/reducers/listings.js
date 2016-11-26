import { handleActions } from 'redux-actions'
import { initialStateFromStorage } from '../helpers/localstorage'

const fakeState = []

// Returns a new state that reflects the modification
const modifiedState = (state, listingId, field, newValue) => {
  return state.map((listing) => {
    return listing.id === listingId
      ? { ...listing, [field]: newValue }
      : listing
  })
}

export default handleActions({
  'delete listing': (state, action) => {
    return state.filter(listing => listing.id !== action.payload.id)
  },
  'edit listing': (state, action) => {
    const { id, field, value } = action.payload
    return modifiedState(state, id, field, value)
  },
  'add listing': (state, action) => {
    const newListing = action.payload
    return [{
      id: newListing.id,
      owner: newListing.owner,
      title: newListing.title,
      filename: newListing.filename,
      fileurl: newListing.fileurl,
      amountToSell: newListing.amountToSell,
      noSellLimit: newListing.noSellLimit,
      sold: 0,
      price: newListing.price,
      listingPageUrl: 'fake-for-now',
      description: newListing.description,
      live: newListing.live,
      dateCreated: 'some-value-not-date-now',
    }, ...state]
  },
  'replace listings': (state, action) => {
    return action.payload
  },
  'update listing': (state, action) => {
    const { payload } = action
    return state.map((listing) => {
      return listing.id === payload.id
        ? Object.assign(listing, payload)
        : listing
    })
  },
  'complete listing': (state, action) => {
    return state.map((listing) => {
      return listing.id === action.payload
        ? { ...listing, completed: !listing.completed }
        : listing
    })
  },
  'complete all': (state, action) => {
    const areAllMarked = state.every(listing => listing.completed)
    return state.map((listing) => {
      return {
        ...listing,
        completed: !areAllMarked,
      }
    })
  },
  'clear complete': (state, action) => {
    return state.filter(listing => listing.completed === false)
  },
}, initialStateFromStorage.listings || fakeState)
