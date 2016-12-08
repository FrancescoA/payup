import { handleActions } from 'redux-actions'

const defaultFileState = () => ({})

export default handleActions({
  'replace file urls': (state, action) => {
    return action.payload
  },
  'update file url': (state, action) => {
    const obj = action.payload
    return { ...state, [obj.fileId]: obj.fileUrl }
  },
}, defaultFileState())
