import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'
import { Menu, Container, Item, Image } from 'semantic-ui-react'

import SimpleDropdown from '../SimpleDropdown'
import * as AuthActions from '../../actions/auth'
import img from '../../../static/img/LogoExport.png'

class Header extends Component {
  render() {
    const { auth, actions, router } = this.props
    return (
      <Menu size='large'>
        <Container>
          <Item>
            <Image size='tiny' alt='logo' src={img} />
          </Item>
          <Menu.Menu position='right'>
            <SimpleDropdown
              title={auth.auth ?
                auth.user.email :
                <LogInButton />
              }
            >
              {auth.auth && <LogOutItem actions={actions} router={router} />}
            </SimpleDropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const LogInButton = () => (
  <Link to='login'><div className='ui primary button'>Login</div></Link>
)


const LogOutItem = (props) => {
  const { router } = props
  const { logOut } = props.actions
  return (
    <a
      className='item'
      onClick={() => {
        router.push('login')
        logOut()
      }}
    >Logout</a>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
