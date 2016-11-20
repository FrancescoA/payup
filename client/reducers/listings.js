import { handleActions } from 'redux-actions'
import { initialStateFromStorage } from '../helpers/localstorage'

const fakeState = [
  {
    id: 'some-hash1',
    owner: 'some-id',
    title: 'Compromising Pictures of Elliot',
    filename: 'wanker.jpg',
    fileurl: 'www.elliot.com/compromising.jpg',
    amountToSell: 10,
    noSellLimit: true,
    sold: 5,
    price: '5.00',
    listingPageUrl: 'www.payupd.com/elliot/somelisting',
    description: 'These are REALLY compromising, dont miss out',
    live: true,
    dateCreated: '01-01-2016',
  },
  {
    id: 'some-hash2',
    owner: 'some-id-2',
    title: 'Odesza tickets',
    filename: 'tickets.pdf',
    fileurl: 'www.firebase.com/lalalfsdfefefs.pdf',
    amountToSell: 1,
    noSellLimit: true,
    sold: 0,
    price: '50.00',
    listingPageUrl: 'www.payupd.com/fra/odesza',
    description: 'Cannot go anymore please buy',
    live: false,
    dateCreated: '01-01-2016',
  },
  {
    id: 'some-hash3',
    owner: 'some-id-3',
    title: 'Amazon PM talk',
    filename: 'wanker.jpg',
    fileurl: 'www.elliot.com/compromising.jpg',
    amountToSell: 2,
    noSellLimit: true,
    sold: 2,
    price: '10.00',
    listingPageUrl: 'www.payupd.com/smurf/eventbrightsucks',
    description: 'Bought these on EventBright but no longer want to go',
    live: true,
    dateCreated: '01-01-2016',
  },
]

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
