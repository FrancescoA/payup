
import { handleActions } from 'redux-actions'

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default handleActions({
  'add listing' (state, action) {
    return [{
      id: state.reduce((maxId, listing) => Math.max(listing.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  },

  'delete listing' (state, action) {
    return state.filter(listing => listing.id !== action.payload )
  },

  'edit listing' (state, action) {
    return state.map(listing => {
      return listing.id === action.payload.id
        ? { ...listing, text: action.payload.text }
        : listing
    })
  },

  'complete listing' (state, action) {
    return state.map(listing => {
      return listing.id === action.payload
        ? { ...listing, completed: !listing.completed }
        : listing
    })
  },

  'complete all' (state, action) {
    const areAllMarked = state.every(listing => listing.completed)
    return state.map(listing => {
      return {
        ...listing,
        completed: !areAllMarked
      }
    })
  },

  'clear complete' (state, action) {
    return state.filter(listing => listing.completed === false)
  }
}, initialState)
