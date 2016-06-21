
import React, { Component } from 'react'
import ListingTextInput from '../ListingTextInput'
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
    const {listing, completeListing, deleteListing} = this.props

    let element
    if (this.state.editing) {
      element = (
        <ListingTextInput text={listing.text}
           editing={this.state.editing}
           onSave={(text) => this.handleSave(listing.id, text)} />
      )
    } else {
      element = (
        <div className={style.view}>
          <input className={style.toggle}
             type="checkbox"
             checked={listing.completed}
             onChange={() => completeListing(listing.id)} />

          <label onDoubleClick={::this.handleDoubleClick}>
            {listing.text}
          </label>

          <button className={style.destroy} onClick={() => deleteListing(listing.id)} />
        </div>
      )
    }

    // LISTING: compose
    const classes = classnames({
      [style.completed]: listing.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    })

    return (
      <li className={classes}>
        {element}
      </li>
    )
  }
}

export default ListingItem
