import React, { Component } from 'react'
import Modal from '../Modal'
import ListingForm from '../ListingForm'
import { database } from '../../constants/firebase'

class EditAddListingModal extends Component {
  render() {
    const { showing, close, listing, user, actions } = this.props
    const { addListing } = actions
    const { editListingPending, updateListing } = actions
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
            if (formData.id) { // existing listing
              editListingPending(formData)
              updateListing(formData)
            } else { // new listing
              formData.owner = user.uid
              addListing2(formData)
            }
            close()
          }}
        />
      </Modal>
    )
  }
}

export default EditAddListingModal