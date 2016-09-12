import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import LoginSection from './Components/LoginSection'
import MainSection from './Components/MainSection'
import AccountSection from './Components/AccountSection'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MainSection}/>
        <Route path="login" component={LoginSection}/>
        <Route path="account" component={AccountSection}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
