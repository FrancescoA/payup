/*
  redux-persist only allows getting local storage data async, but we can still
  read the data from local storage synchronously on startup (we don't care about writing)
*/
import { reducersToSync, storageKey } from '../constants/localstorage'

const getInitialState = () => {
  const initialState = {}
  reducersToSync.forEach((reducer) => {
    try {
      initialState[reducer] = JSON.parse(window.localStorage.getItem(storageKey + reducer))
    } catch (e) {
      initialState[reducer] = null
    }
  })
  return initialState
}

export const initialStateFromStorage = getInitialState()
