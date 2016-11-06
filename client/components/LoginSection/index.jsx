import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'
import firebase, { facebookAuthProvider, database } from '../../constants/firebase'


class LoginSection extends Component {

  facebookLogIn() {
    const { actions, router } = this.props
    actions.logInAttempt()
    firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
      const { user } = result
      database.ref('users/' + user.uid).set({
        // save only some user info
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }, (error) => {
        if (error) {
          console.log(error)
          actions.logInFailure()
        } else {
          actions.logInSuccess(user)
          router.push('/')
        }
      })
    }).catch((err) => {
      actions.logInFailure()
    })
  }

  render() {
    return (
      <div className='ui raised padded container segment'>
        <div>
          <h1 className='ui header'> Login </h1>
        </div>
        <div className='ui clearing divider'/>
        <button onClick={::this.facebookLogIn} className='ui big facebook button'>
          <i className='facebook icon'/>
          Log in with Facebook
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSection))