import { handleActions } from 'redux-actions'

const defaultFileState = () => ({})

export default handleActions({
  'replace file urls': (state, action) => {
    return action.payload
  },
  'update file url': (state, action) => {
    return Object.assign({}, state, action.payload)
  },
}, defaultFileState())
