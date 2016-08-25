import React, { Component } from 'react'
import Modal from '../Modal'
import ListingForm from '../ListingForm'

class EditAddListingModal extends Component {
  render() {
    const { showing, close, listing, actions } = this.props
    const headerText = listing ? 'Edit Your Listing' : 'Add a Listing'
    return (
      <Modal showing={showing}>
        <i onClick={close} className='close icon'/>
        <div className='header'>
          {headerText}
        </div>
        <ListingForm
          classes='content'
          defaultFormData={listing} 
          handleSubmit={(formData) => {
            if (listing) { // Existing listing
              actions.bulkEditListing(formData)
            } else {
              formData.id = 'some-random-id' // TODO: Figure this out
              actions.addListing(formData)
            }
            close()
          }}
        />
      </Modal>
    )
  }
}

export default EditAddListingModal