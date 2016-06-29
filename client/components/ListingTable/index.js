import React, { Component } from 'react'
import classnames from 'classnames'
import Listing from '../Listing'
import style from './style.css'
import {fieldDisplayMappings} from '../../constants/mappings'

class ListingTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visibleFields: ['alias', 'filename', 'listingPageUrl', 'price', 'sold', 'amountToSell', 'live']
    }
  }

  render() {
    const { listings, actions } = this.props
    const { visibleFields } = this.state 
    return (
      <table className={classnames('ui compact definition table', style.table)}>
        <thead>
          <tr>
            <th>
              {/* col for edit/delete buttons */}
            </th>
            {visibleFields.map(fieldName =>
              <th key={fieldName}>
                {fieldDisplayMappings[fieldName]}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
            {listings.map(listing =>
              <Listing 
                visibleFields={visibleFields}
                key={listing.id} 
                listing={listing} 
                deleteListing={actions.deleteListing}
                editListing={actions.editListing}
              />
            )}
        </tbody>
      </table>
    )
  }
}

export default ListingTable