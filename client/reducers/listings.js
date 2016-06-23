
import { handleActions } from 'redux-actions'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  },
  {
    text: 'Use React',
    completed: false,
    id: 1
  },
  {
    text: 'Use My Butt',
    completed: false,
    id: 2
  },
]

const fakeState = [
  {
    id: 'some-hash1',
    alias: 'Compromising Pictures of Elliot',
    filename: 'wanker.jpg',
    fileUrl: 'www.elliot.com/compromising.jpg',
    available: 10,
    sold: 5,
    price: '$5.00',
    listingPageUrl: 'www.payupd.com/elliot/somelisting',
    description: 'These are REALLY compromising, dont miss out',
    live: true
  },
  {
    id: 'some-hash2',
    alias: 'Odesza tickets',
    filename: 'tickets.pdf',
    fileUrl: 'www.firebase.com/lalalfsdfefefs.pdf',
    available: 1,
    sold: 0,
    price: '$50.00',
    listingPageUrl: 'www.payupd.com/fra/odesza',
    description: 'Cannot go anymore please buy',
    live: false
  },
  {
    id: 'some-hash3',
    alias: 'Amazon PM talk',
    filename: 'wanker.jpg',
    fileUrl: 'www.elliot.com/compromising.jpg',
    available: 2,
    sold: 2,
    price: '$10.00',
    listingPageUrl: 'www.payupd.com/smurf/eventbrightsucks',
    description: 'Bought these on EventBright but no longer want to go',
    live: true
  }
]

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
        ? { ...listing, [action.payload.field]: action.payload.text }
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
}, fakeState)
