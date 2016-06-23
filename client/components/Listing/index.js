
import React, { Component } from 'react'
import ListingItem from '../ListingItem'

import classnames from 'classnames'
import style from './style.css'

class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    // this.state = {
    //   editing: false
    // }
  }

  // handleDoubleClick() {
  //   this.setState({ editing: true })
  // }

  handleSave(field, text) {
    const id = this.props.listing.id
    this.props.editListing({ id, field, text })
  }

  render() {
    // const {listing, completeListing, deleteListing} = this.props
    const props = this.props
    const {listing, editListing} = props
    const {id, alias, filename, fileurl} = listing
    return (
      <tr>
        <ListingItem 
          text={alias}
          handleEdit={this.handleSave.bind(this, 'alias')}
        />
        <ListingItem 
          text={filename}
          handleEdit={this.handleSave.bind(this, 'filename')}
        />
        <ListingItem 
          text={fileurl}
          handleEdit={this.handleSave.bind(this, 'fileurl')}
        />
      </tr>
    )
  }
}

export default Listing
