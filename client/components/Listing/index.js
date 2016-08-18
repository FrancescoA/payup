import React, { Component } from 'react'
import ListingItem from '../ListingItem'
import {fieldEditableMappings} from '../../constants/mappings'
import classnames from 'classnames'
import style from './style.css'


class Listing extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleSave(field, value) {
    const id = this.props.listing.id
    this.props.editListing({ id, field, value })
  }

  render() {
    // const {listing, completeListing, deleteListing} = this.props
    const { listing, visibleFields, deleteListing } = this.props 
    const { id } = listing
    return (
      <tr>
        <td className='collapsing'>
            <a> 
              <i className='large setting icon'/>
            </a>
            <a onClick={() => deleteListing(id)}>
              <i className='large red remove icon'/>
            </a>
        </td>
        {visibleFields.map(fieldName => 
          <ListingItem 
            editable={fieldEditableMappings[fieldName]}
            key={fieldName}
            name={fieldName}
            value={listing[fieldName]}
            handleEdit={this.handleSave.bind(this, fieldName)}
          />
        )}
      </tr>
    )
  }
}

export default Listing
