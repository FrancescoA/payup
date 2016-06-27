
import React, { Component } from 'react'
import ListingItem from '../ListingItem'
import {fieldEditableMappings} from '../../constants/mappings'
import classnames from 'classnames'
import style from './style.css'
import colors from '../../constants/colors.css'


class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    // this.state = {
    //   editing: false
    // }
  }

  handleSave(field, value) {
    const id = this.props.listing.id
    this.props.editListing({ id, field, value })
  }

  render() {
    // const {listing, completeListing, deleteListing} = this.props
    const {listing, visibleFields, deleteListing} = this.props
    const {id, alias, filename, fileurl} = listing
    return (
      <tr>
        <td className='collapsing'>
            <button> 
              <i className='large setting icon'/>
            </button>
            <button onClick={() => deleteListing(id)}>
              <i className='large red remove icon'/>
            </button>
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
