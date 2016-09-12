import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import * as ListingActions from '../../actions/listings'
import style from './style.css'

class App extends Component {
  render() {
    const contentStyle = {
      height: '100%'
    }
    const { children, listings, actions } = this.props
    return (
      <div className={style.normal}>
        <Header/>
        <div className='container-fluid' style={contentStyle}>
          {React.cloneElement(
            children, 
            { listings, actions }
          )}
        </div>
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
