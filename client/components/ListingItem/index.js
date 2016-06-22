import React, { Component } from 'react'
import ListingTextInput from '../ListingTextInput'
import ListingItemLabel from '../ListingItemLabel'
import classnames from 'classnames'
import style from './style.css'

class ListingItem extends Component {
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
    // LISTING: compose
    // const classes = classnames({
    //   [style.completed]: listing.completed,
    //   [style.editing]: this.state.editing,
    //   [style.normal]: !this.state.editing
    // })

    const {listing, completeListing, deleteListing} = this.props
    let element
    if (this.state.editing) {
      element = (
        <ListingTextInput className={style.editing} text={listing.text}
           editing={this.state.editing}
           onSave={(text) => this.handleSave(listing.id, text)} />
      )
    } else {
      element = (
        <ListingItemLabel className={style.normal} text={listing.text}
          handleDoubleClick={::this.handleDoubleClick} />
        )
    }

    return element
  }
}

export default ListingItem
