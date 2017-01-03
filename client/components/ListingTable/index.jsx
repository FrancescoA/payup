import React, { Component } from 'react'
import classnames from 'classnames'
import { Modal, Button, Icon, Table, Segment } from 'semantic-ui-react'
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
      <Modal basic size='small' open={this.state.deleteModalShowing}>
        <Modal.Header>
          Are you sure you want to delete this listing?
        </Modal.Header>
        <Modal.Actions>
          <Button
            basic
            color='red'
            onClick={this.closeDeleteModal}
          >
            <Icon name='remove'/> No
          </Button>
          <Button
            basic
            color='green'
            onClick={() => {
              this.props.actions.deleteListing(this.state.deleteModalListing)
              this.closeDeleteModal()
            }}
          >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  render() {
    const { listings, actions, openEditListingModal, isLoading, fileToUrlMapping } = this.props
    const { visibleFields } = this.state
    return (
      <Segment
        basic
        style={{ padding: 0 }}
        className={classnames({
          loading: isLoading,
        })}
      >
        {this.renderDeleteModal()}
        <Table compact selectable definition className={classnames(style.table)}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {/* col for edit/delete buttons */}
              </Table.HeaderCell>
              {visibleFields.map(fieldName =>
                <Table.HeaderCell key={fieldName}>
                  {fieldDisplayMappings[fieldName]}
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
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
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default ListingTable
