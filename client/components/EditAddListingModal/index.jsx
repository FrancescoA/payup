import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal, Icon, Header } from 'semantic-ui-react'
import * as ListingActions from '../../actions/listings'
import ListingForm from '../ListingForm'

class EditAddListingModal extends Component {
  render() {
    const { showing, close, listing, user, actions } = this.props
    const { addListing, updateListing, uploadNewFile, deleteFileOfListing } = actions
    const headerText = listing ? 'Edit Your Listing' : 'Add a Listing'
    return (
      <Modal open={showing}>
        <Icon onClick={close} name='close' />
        <Header>
          {headerText}
        </Header>
        <ListingForm
          classes='content'
          isFileUploading={this.props.isFileUploading}
          fileUploadingPercentage={this.props.fileUploadingPercentage}
          defaultFormData={listing}
          handleSubmit={(listingFormData, file) => {
            if (listingFormData.id) { // existing listing
              if (file) { // We should delete the previous file
                Promise.all([deleteFileOfListing(listing), uploadNewFile(user.uid, file)])
                .then(res => Promise.resolve(res[1]))
                .then(({ fileId, fileUrl }) => {
                  close()
                  updateListing(Object.assign({}, listingFormData, { fileId }))
                })
              } else { // There was no update to the file
                updateListing(listingFormData)
                close()
              }
            } else { // new listing
              // there has to be a file if it's a new listing
              uploadNewFile(user.uid, file).then(({ fileId, fileUrl }) => {
                close()
                addListing(Object.assign({}, listingFormData, { fileId, owner: user.uid }))
              })
            }
          }}
        />
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFileUploading: state.loadingState.fileUploading,
    fileUploadingPercentage: state.loadingState.fileUploadingPercentage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ListingActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAddListingModal)
