import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Header, Divider, Button, Icon } from 'semantic-ui-react'
import * as AuthActions from '../../actions/auth'

class LoginSection extends Component {

  render() {
    const { actions, router } = this.props
    return (
      <Segment raised padded className='container'>
        <Header as='h1'> Login </Header>
        <Divider clearing />
        <Button size='big' color='facebook' onClick={() => actions.facebookLogIn().then(() => router.push('/'))}>
          <Icon name='facebook' /> Log in with Facebook
        </Button>
      </Segment>
    )
  }
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
)(LoginSection))
