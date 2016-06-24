import React, { Component } from 'react'
import classnames from 'classnames'
import Listing from '../Listing'
import style from './style.css'
import colors from '../../constants/colors.css'
import {fieldDisplayMappings} from '../../constants/mappings'

class ListingTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visibleFields: ['alias', 'filename', 'listingPageUrl', 'price', 'sold', 'amountToSell']
    }
  }

  render() {
    const { listings, actions } = this.props
    const { visibleFields } = this.state 
    return (
      <div className='table-responsive'>
        <table className={classnames('table table-hover', style.table)}>
          <thead>
            <tr>
              <th>
                {/* col for edit button */}
              </th>
              {visibleFields.map(fieldName =>
                <th key={fieldName}>
                  {fieldDisplayMappings[fieldName]}
                </th>
              )}
              <th>
                {/* col for delete button */}
              </th>
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
      </div>
    )
  }
}

export default ListingTable