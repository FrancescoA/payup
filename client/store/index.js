import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import { logger } from '../middleware'
import rootReducer from '../reducers'
import * as api from '../helpers/api'
import { reducersToSync, storageKey } from '../constants/localstorage'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    thunk.withExtraArgument(api),
    logger,
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState, autoRehydrate())
  persistStore(store, {
    whitelist: reducersToSync,
    keyPrefix: storageKey,
  })

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
