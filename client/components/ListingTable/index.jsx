import React, { Component } from 'react'
import classnames from 'classnames'
import Modal from '../Modal'
import Listing from '../Listing'
import style from './style.css'
import { fieldDisplayMappings } from '../../constants/mappings'

class ListingTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visibleFields: ['title', 'filename', 'listingPageUrl', 'price', 'sold', 'amountToSell', 'live'],
      deleteModalShowing: false,
      deleteModalListing: null,
    }
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
  }

  openDeleteModal(listing) {
    this.setState({
      deleteModalShowing: true,
      deleteModalListing: listing,
    })
  }

  closeDeleteModal() {
    this.setState({
      deleteModalShowing: false,
      deleteModalListing: null,
    })
  }

  renderDeleteModal() {
    return (
      <Modal showing={this.state.deleteModalShowing} classes='small basic'>
        <div className='header'>
          Are you sure you want to delete this listing?
        </div>
        <div className='actions'>
          <div
            onClick={this.closeDeleteModal}
            className='ui red basic cancel button'
          >
            <i className='remove icon' />
            No
          </div>
          <div
            onClick={() => {
              this.props.actions.deleteListing(this.state.deleteModalListing)
              this.closeDeleteModal()
            }}
            className='ui green basic ok button'
          >
            <i className='checkmark icon' />
            Yes
          </div>
        </div>
      </Modal>
    )
  }

  render() {
    const { listings, actions, openEditListingModal, isLoading, fileToUrlMapping } = this.props
    const { visibleFields } = this.state
    return (
      <div
        style={{ padding: 0 }}
        className={classnames('ui basic segment', {
          loading: isLoading,
        })}
      >
        {this.renderDeleteModal()}
        <table className={classnames('ui compact definition table', style.table)}>
          <thead>
            <tr>
              <th>
                {/* col for edit/delete buttons */}
              </th>
              {visibleFields.map(fieldName =>
                <th key={fieldName}>
                  {fieldDisplayMappings[fieldName]}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {listings.map(listing =>
              <Listing
                visibleFields={visibleFields}
                fileUrl={fileToUrlMapping[listing.fileId]}
                key={listing.id}
                listing={listing}
                deleteListing={this.openDeleteModal}
                editListing={actions.editListing}
                openEditListingModal={openEditListingModal}
              />
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListingTable
