import React, { Component } from 'react'
import ListingTable from '../ListingTable'
import TableHeading from '../TableHeading'
import SliderToggle from '../SliderToggle'
import Modal from '../Modal'
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

  renderEditAddListingModal() {
    return (
      <Modal showing={this.state.editAddModalShowing}>
        <i 
        onClick={() => this.setState({editAddModalShowing: false})}
        className='close icon'
        />
        <div className='header'>
          Add a Listing
        </div>
        <div className='content'>
          <form className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' name='first-name' placeholder=''/>
            </div>
            <div className='field'>
              <label>File Name</label>
              <input type='text' name='last-name' placeholder=''/>
            </div>
            <div className='two fields'>
              <div className='field'>
                <label> Price </label>
                <input type='number' name='price'/>
              </div>
              <div className='field'>
                <label> Amount </label>
                <input type='number' name='amount'/>
              </div>
            </div>
            <div className='field'>
              <label> Description </label>
              <textarea rows="3"></textarea>
            </div>
            <div className='inline field'>
              <SliderToggle
                label='Live' 
              />
            </div>
            <button className='ui button' type='submit'>Submit</button>
          </form>
        </div>
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
