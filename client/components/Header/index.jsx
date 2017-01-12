import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'
import { Menu, Container, Item, Image, Button } from 'semantic-ui-react'

import SimpleDropdown from '../SimpleDropdown'
import * as AuthActions from '../../actions/auth'
import img from '../../../static/img/LogoExport.png'

class Header extends Component {
  render() {
    const { auth, actions, router } = this.props
    return (
      <Menu size='huge'>
        <Container>
          <Menu.Item>
            <Image size='tiny' alt='logo' src={img} />
          </Menu.Item>
          {auth.auth && 
            <Menu.Item as={Link} to='/'>
              Listings 
            </Menu.Item>
          }
          {auth.auth && 
            <Menu.Item as={Link} to='account'>
                Account
            </Menu.Item>
          }
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

const LogInButton = () => <Button primary as={Link} to='login'>Login</Button>

const LogOutItem = (props) => {
  const { router } = props
  const { logOut } = props.actions
  return (
    <Item as='a'
      onClick={() => {
        router.push('login')
        logOut()
      }}
    >Logout</Item>
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
