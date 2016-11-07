import React, { Component } from 'react'
import Modal from '../Modal'
import ListingForm from '../ListingForm'
import { database } from '../../constants/firebase'

class EditAddListingModal extends Component {
  setListingRef(formData, success, failure) {
    const { id, owner } = formData
    let updates = {}
    updates['listings/' + id] = formData
    updates['users/' + owner + '/listings/' + id] = formData
    database.ref().update(updates, (error) => {
      if (error) {
        failure(id)
      } else {
        success(id)
      }
    })
  }

  render() {
    const { showing, close, listing, user, actions } = this.props
    const { addListing, addListingSuccess, addListingFailure } = actions
    const { editListingPending, bulkEditListing, editListingFailure } = actions
    const headerText = listing ? 'Edit Your Listing' : 'Add a Listing'
    const listingsRef = database.ref('listings')
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
              this.setListingRef(formData, () => bulkEditListing(formData), editListingFailure)
            } else { // new listing
              const key = listingsRef.push().key
              formData.id = key
              formData.owner = user.uid
              actions.addListing(formData)
              this.setListingRef(formData, addListingSuccess, addListingFailure)
            }
            close()
          }}
        />
      </Modal>
    )
  }
}

export default EditAddListingModal