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

  handleSave(text) {
    this.props.handleEdit(text)
    this.setState({ editing: false })
  }

  render() {
    // LISTING: compose
    // const classes = classnames({
    //   [style.completed]: listing.completed,
    //   [style.editing]: this.state.editing,
    //   [style.normal]: !this.state.editing
    // })

    const {listing, text} = this.props
    let element
    if (this.state.editing) {
      element = (
        <ListingTextInput className={style.editing} text={text}
           editing={this.state.editing}
           onSave={(text) => this.handleSave(text)} />
      )
    } else {
      element = (
        <ListingItemLabel className={style.normal} text={text}
          handleDoubleClick={::this.handleDoubleClick} />
        )
    }

    return element
  }
}

export default ListingItem
