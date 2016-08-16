import React, { Component } from 'react'
import ListingTable from '../ListingTable'
import TableHeading from '../TableHeading'
import SliderToggle from '../SliderToggle'
import Modal from '../Modal'
import ListingForm from '../ListingForm'
import FileDragArea from '../FileDragArea'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import style from './style.css'

const LISTING_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: listing => !listing.completed,
  [SHOW_COMPLETED]: listing => listing.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { 
      filter: SHOW_ALL,
      editAddModalShowing: false,
    }
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.listings.some(listing => listing.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  openAddEditModal() {
    this.setState({editAddModalShowing: true})
  }

  closeAddEditModal() {
    this.setState({editAddModalShowing: false})
  }

  // TODO: Move this to own component
  renderEditAddListingModal() {
    const { actions } = this.props
    return (
      <Modal showing={this.state.editAddModalShowing}>
        <i 
        onClick={::this.closeAddEditModal}
        className='close icon'
        />
        <div className='header'>
          Add a Listing
        </div>
        <ListingForm 
          handleSubmit={(formData) => {
              actions.addListing(formData)
              this.closeAddEditModal()
            }}
          classes='content'
        />
      </Modal>
    )
  }

  render() {
    const { listings, actions } = this.props
    const { filter } = this.state
    // this.renderToggleAll(liveCount)
    const filteredListings = listings.filter(LISTING_FILTERS[filter])
    const liveCount = listings.reduce((count, listing) => {
      return listing.live ? count + 1 : count
    }, 0)

    let content = ( 
      <ListingTable
        listings={filteredListings}
        actions={actions}
      /> 
    )

    if (!listings.length) {
      content = (
        <h3> You have no listings! </h3>
      )
    }

    return (
      <div className='ui raised padded container segment'>
        {this.renderEditAddListingModal()}
        <div>
          <h1 className={classnames(style.heading, 'ui header')}> Listings </h1>
        </div>
        <div className='ui clearing divider'/>
        <TableHeading
          openAddEditModal={::this.openAddEditModal}
        />
        <div className='ui divider hidden'/>
        {content}
      </div>
    )
  }
}

export default MainSection
