import React, { Component } from 'react'
import Modal from '../Modal'
import ListingForm from '../ListingForm'
import { uploadNewFile } from '../../helpers/api'
import { database } from '../../constants/firebase'

class EditAddListingModal extends Component {
  render() {
    const { showing, close, listing, user, actions } = this.props
    const { addListing, updateListing, updateFileUrl } = actions
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
          uploadNewFile={uploadNewFile(user.uid)} 
          handleSubmit={(listingFormData, fileUrl) => {
            if (listingFormData.id) { // existing listing
              updateListing(listingFormData)
            } else { // new listing
              listingFormData.owner = user.uid
              updateFileUrl({ [listingFormData.fileId]: fileUrl })
              addListing(listingFormData)
            }
            close()
          }}
        />
      </Modal>
    )
  }
}

export default EditAddListingModal