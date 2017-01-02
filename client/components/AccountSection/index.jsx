import React, { Component } from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'

class AccountSection extends Component {

  render() {
    return (
      <Segment raised padded className='container'>
        <Header as='h1'> Account </Header>
        <Divider clearing />
      </Segment>
    )
  }
}

export default AccountSection
