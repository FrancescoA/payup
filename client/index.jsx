import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import LoginSection from './components/LoginSection'
import MainSection from './components/MainSection'
import AccountSection from './components/AccountSection'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

// This needs to be here so we can make a closure around store
const requireAuth = (nextState, replace) => {
  const { auth } = store.getState()
  if (!auth.auth) {
    replace('login')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MainSection} onEnter={requireAuth}/>
        <Route path="login" component={LoginSection}/>
        <Route path="account" component={AccountSection}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
