import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as AuthActions from '../../actions/auth'
import img from '../../../static/img/LogoExport.png'
import { prefixUrl } from '../../helpers/config'
import SimpleDropDown from '../SimpleDropDown'
import firebase from '../../constants/firebase'

class Header extends Component {
  render() {
    const { auth, actions, router } = this.props
    return (
      <div className='ui large menu'>
        <div className='ui container'>
          <div className='item'>
            <img className='ui image tiny' src={prefixUrl(img)}/>
          </div>
          <div className='right menu'>
            <SimpleDropDown
              title={auth.auth ? 
                auth.user.email : 
                <LogInButton/>
              }
            >
              {auth.auth && <LogOutItem actions={actions} router={router}/>}
            </SimpleDropDown>
          </div>
        </div>
      </div>
    )
  }
}

const LogInButton = () => {
  return (
    <Link to="login"><div className='ui primary button'>Login</div></Link>
  )
}

const LogOutItem = (props) => {
  const { router } = props
  const { logOut } = props.actions
  return (
    <a className='item' onClick={() => logOut().then(() => router.push('login'))}>Logout</a>
  )
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
)(Header))