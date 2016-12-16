import { handleActions } from 'redux-actions'

const MAX_PENDING_REQUEST_AGE = 60 * 1000

/**
 * A request looks like this
 * {
 *  type: 'delete',
 *  maxAge: 24325543, // only for pending requests
 *  data: { must have id }
 * }
 */
const initialState = {
  pendingRequests: [],
  failedRequests: [],
  fileUploading: false,
  fileUploadingPercentage: 0,
}

export default handleActions({
  'add pending request': (state, action) => {
    const { pendingRequests } = state
    const request = Object.assign(action.payload, { maxAge: Date.now() + MAX_PENDING_REQUEST_AGE })
    return {
      ...state,
      pendingRequests: [request, ...pendingRequests],
    }
  },
  'remove pending request': (state, action) => {
    const { type, data } = action.payload
    const { id } = data
    return {
      ...state,
      pendingRequests: state.pendingRequests.filter((obj) => {
        return obj.data.id !== id && obj.type !== type
      }),
    }
  },
  'add failed request': (state, action) => {
    const { failedRequests } = state
    return {
      ...state,
      failedRequests: [action.payload, ...failedRequests],
    }
  },
  'remove failed request': (state, action) => {
    const { type, data } = action.payload
    const { id } = data
    return {
      ...state,
      failedRequests: state.failedRequests.filter((obj) => {
        return obj.data.id !== id && obj.type !== type
      }),
    }
  },
  'set file loading state': (state, action) => {
    const { isUploading, percentage } = action.payload
    return { ...state, fileUploading: isUploading, fileUploadingPercentage: percentage }
  },
}, initialState)
