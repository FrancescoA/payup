import React, { Component } from 'react'
import { Link } from 'react-router'
import { Table } from 'semantic-ui-react'
import SliderToggle from '../SliderToggle'
import ListingTextInput from '../ListingTextInput'
import ListingItemLabel from '../ListingItemLabel'

// TODO: refactor this class
class ListingItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleDoubleClick() {
    if (this.props.editable) this.setState({ editing: true })
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

    const { fileUrl, listing, value, name } = this.props
    const { editing } = this.state
    if (name === 'live') {
      return (
        <Table.Cell className='collapsing'>
          <SliderToggle
            checked={value}
            onSave={this.handleSave}
            classes='fitted'
          />
        </Table.Cell>
      )
    } else if (name === 'listingPageUrl') { // Compute this field
      return (
        <ListingPageUrlDisplay
          key={name}
          listingId={listing.id}
        />
      )
    } else if (name === 'filename') {
      return (
        <Table.Cell>
          <Link rel='noopener noreferrer' target='_blank' to={fileUrl}>
            {value}
          </Link>
        </Table.Cell>
      )
    }

    let element
    if (editing) {
      element = (
        <ListingTextInput
          placeholder='Untitled'
          text={value}
          onSave={this.handleSave}
        />
      )
    } else {
      element = (
        <ListingItemLabel
          text={value}
          handleDoubleClick={this.handleDoubleClick}
        />
      )
    }

    return (
      <Table.Cell>
        {element}
      </Table.Cell>
    )
  }
}

const ListingPageUrlDisplay = ({ listingId }) => (
  <Table.Cell>
    <Link rel='noopener noreferrer' target='_blank' to={`${window.location.origin}/listings/${listingId}`}>
      {`${window.location.hostname}/listings/${listingId}`}
    </Link>
  </Table.Cell>
)


export default ListingItem
