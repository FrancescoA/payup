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
      visibleFields: ['alias', 'filename', 'listingPageUrl', 'price', 'sold', 'amountToSell', 'live'],
      deleteModalShowing: false,
      deleteModalId: undefined
    }
  }

  renderDeleteModal() {
    return (
      <Modal showing={this.state.deleteModalShowing} classes={'small basic'}>
        <div className='header'>
          Are you sure you want to delete this listing?
        </div>
        <div className='actions'>
          <div 
          onClick={::this.closeDeleteModal} 
          className='ui red basic cancel button'> 
          <i className='remove icon'/>
            No 
          </div>
          <div onClick={() => {
            this.props.actions.deleteListing(this.state.deleteModalId)
            this.closeDeleteModal()
          }} 
          className='ui green basic ok button'> 
            <i className='checkmark icon'/>
            Yes 
          </div>
        </div>
      </Modal>
    )
  }

  openDeleteModal(listingId) {
    this.setState({
      deleteModalShowing: true,
      deleteModalId: listingId
    })
  }

  closeDeleteModal() {
    this.setState({
      deleteModalShowing: false,
      deleteModalId: undefined
    })
  }

  render() {
    const { listings, actions } = this.props
    const { visibleFields } = this.state 
    return (
      <div>
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
                  key={listing.id} 
                  listing={listing} 
                  deleteListing={::this.openDeleteModal}
                  editListing={actions.editListing}
                />
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListingTable