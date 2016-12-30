import React, { Component } from 'react'
import ListingItem from '../ListingItem'
import { fieldEditableMappings } from '../../constants/mappings'


class Listing extends Component {
  handleSave(field, value) {
    const listing = this.props.listing
    this.props.editListing(listing, field, value)
  }

  render() {
    const { fileUrl, listing, visibleFields, deleteListing, openEditListingModal } = this.props
    return (
      <tr>
        <td className='collapsing'>
          <i className='large link setting icon' onClick={() => openEditListingModal(listing)} />
          <i className='large link red remove icon' onClick={() => deleteListing(listing)} />
        </td>
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
      </tr>
    )
  }
}

export default Listing
