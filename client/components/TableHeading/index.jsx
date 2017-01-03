import React, { Component } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'

const TableHeading = ({ openAddModal }) => (
  <Container>
    <Button fluid inverted
      color='green'
      size='massive'
      onClick={() => openAddModal()}
    >
      <Icon name='cloud upload' /> Add a Listing
    </Button>
  </Container>
)

export default TableHeading
