import React, { Component } from 'react'
import Modal from '../Modal'
import ListingForm from '../ListingForm'

class EditAddListingModal extends Component {
  render() {
    const { showing, close, listing, user, actions } = this.props
    const { addListing, updateListing, uploadNewFile, deleteFileOfListing } = actions
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
          handleSubmit={(listingFormData, file) => {
            if (listingFormData.id) { // existing listing
              if (file) { // We should delete the previous file
                Promise.all([deleteFileOfListing(listing), uploadNewFile(user.uid, file)])
                .then((res) => Promise.resolve(res[1]))
                .then(({ fileId, fileUrl }) => {
                  close()
                  listingFormData.fileId = fileId
                  updateListing(listingFormData)
                })
              } else { // There was no update to the file
                updateListing(listingFormData)
                close()
              }
            } else { // new listing
              listingFormData.owner = user.uid
              // there has to be a file if it's a new listing
              uploadNewFile(user.uid, file).then(({ fileId, fileUrl }) => {
                close()
                listingFormData.fileId = fileId
                addListing(listingFormData)
              })
            }
          }}
        />
      </Modal>
    )
  }
}

export default EditAddListingModal