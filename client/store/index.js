import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate, getStoredState } from 'redux-persist'

import { logger } from '../middleware'
import rootReducer from '../reducers'
import { reducersToSync, storageKey } from '../constants/localstorage'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    logger,
  )(create)
  
  const store = createStoreWithMiddleware(rootReducer, initialState, autoRehydrate())
  persistStore(store, {
    whitelist: reducersToSync,
    keyPrefix: storageKey
  })

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
