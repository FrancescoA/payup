import React, { Component } from 'react'
import SliderToggle from '../SliderToggle'
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

  handleSave(value) {
    this.props.handleEdit(value)
    this.setState({ editing: false })
  }

  render() {
    // LISTING: compose
    // const classes = classnames({
    //   [style.completed]: listing.completed,
    //   [style.editing]: this.state.editing,
    //   [style.normal]: !this.state.editing
    // })

    const {listing, value, name} = this.props
    const {editing} = this.state
    if (name === 'live') {
      return (
        <td className='collapsing'> 
          <SliderToggle 
            checked={value}
            onSave={(value) => this.handleSave(value)}
            classes='fitted'
          />
        </td>
      )
    }

    let element
    if (editing) {
      element = (
        <ListingTextInput
          placeholder='Untitled'
          text={value}
          onSave={(value) => this.handleSave(value)} 
        />
      )
    } else {
      element = (
        <ListingItemLabel 
          text={value}
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
