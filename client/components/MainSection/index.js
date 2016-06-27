import React, { Component } from 'react'
import ListingTable from '../ListingTable'
import TableHeading from '../TableHeading'
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
      filter: SHOW_ALL
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

  // renderToggleAll(liveCount) {
  //   const { listings, actions } = this.props
  //   if (listings.length > 0) {
  //     return <input
  //       className={style.toggleAll}
  //       type="checkbox"
  //       checked={liveCount === listings.length}
  //       onChange={actions.completeAll} />
  //   }
  // }

  render() {
    const { listings, actions } = this.props
    const { filter } = this.state
    // this.renderToggleAll(liveCount)
    const filteredListings = listings.filter(LISTING_FILTERS[filter])
    const liveCount = listings.reduce((count, listing) => {
      return listing.live ? count + 1 : count
    }, 0)

    return (
      <div className='ui raised padded container segment'>
        <div>
          <h1 className={classnames(style.heading, 'ui header')}> Listings </h1>
        </div>
        <div className='ui clearing divider'/>
        <TableHeading/>
        <ListingTable
          listings={filteredListings}
          actions={actions}
        />
      </div>
    )
  }
}

export default MainSection
