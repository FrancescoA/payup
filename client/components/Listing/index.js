
import React, { Component } from 'react'
import ListingItem from '../ListingItem'

import classnames from 'classnames'
import style from './style.css'

class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteListing(id)
    } else {
      this.props.editListing({ id, text })
    }
    this.setState({ editing: false })
  }

  render() {
    // const {listing, completeListing, deleteListing} = this.props
    const props = this.props;
    return (
      <li>
        <ListingItem {...props}/>
        <ListingItem {...props}/>
      </li>
    )
  }
}

export default Listing
