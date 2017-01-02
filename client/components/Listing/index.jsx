import React, { Component } from 'react'
import ListingItem from '../ListingItem'
import { fieldEditableMappings } from '../../constants/mappings'
import { Table, Icon } from 'semantic-ui-react'

class Listing extends Component {
  handleSave(field, value) {
    const listing = this.props.listing
    this.props.editListing(listing, field, value)
  }

  render() {
    const { fileUrl, listing, visibleFields, deleteListing, openEditListingModal } = this.props
    return (
      <Table.Row>
        <Table.Cell collapsing>
          <Icon name='setting' size='large' link onClick={() => openEditListingModal(listing)} />
          <Icon name='remove' size='large' color='red' link onClick={() => deleteListing(listing)} />
        </Table.Cell>
        {visibleFields.map((fieldName) => {
          return (
            <ListingItem
              listing={listing}
              fileUrl={fileUrl}
              editable={fieldEditableMappings[fieldName]}
              key={fieldName}
              name={fieldName}
              value={listing[fieldName]}
              handleEdit={this.handleSave.bind(this, fieldName)}
            />
          )
        }
        )}
      </Table.Row>
    )
  }
}

export default Listing
