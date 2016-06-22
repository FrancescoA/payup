import React, { Component } from 'react'
import ListingTextInput from '../ListingTextInput'

class Header extends Component {
  handleSave(text) {
    if (text.length) {
      this.props.addListing(text)
    }
  }

  render() {
    return (
      <header>
        <h1>Listings</h1>
        <ListingTextInput
          newListing
          onSave={::this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    )
  }
}

export default Header
