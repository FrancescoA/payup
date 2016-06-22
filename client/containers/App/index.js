
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainSection from '../../components/MainSection'
import * as ListingActions from '../../actions/listings'
import style from './style.css'

class App extends Component {
  render() {
    const { listings, actions, children } = this.props
    return (
      <div className={style.normal}>
        <MainSection listings={listings} actions={actions} />
        {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ListingActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
