import React, { Component } from 'react'
import ListingTextInput from '../ListingTextInput'
import ListingItemLabel from '../ListingItemLabel'
import classnames from 'classnames'
// import style from './style.css'

class ListingItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.props.editable && this.setState({ editing: true })
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
    const {editing} = this.state
    let element
    if (editing) {
      element = (
        <ListingTextInput
          placeholder='Untitled'
          text={text}
          onSave={(text) => this.handleSave(text)} 
        />
      )
    } else {
      element = (
        <ListingItemLabel 
          text={text}
          handleDoubleClick={::this.handleDoubleClick} 
        />
      )
    }

    return ( 
      <td>
        {element}
      </td>
    )
  }
}

export default ListingItem
