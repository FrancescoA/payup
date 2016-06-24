
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

  handleSave(field, text) {
    const id = this.props.listing.id
    this.props.editListing({ id, field, text })
  }

  render() {
    // const {listing, completeListing, deleteListing} = this.props
    const {listing, visibleFields, deleteListing} = this.props
    const {id, alias, filename, fileurl} = listing
    return (
      <tr>
        <td>
          <button> 
            <span
              className={classnames('glyphicon glyphicon-cog')}
            > 

            </span>
          </button>
        </td>
        {visibleFields.map(fieldName => 
          <ListingItem 
            editable={fieldEditableMappings[fieldName]}
            key={fieldName}
            text={listing[fieldName]}
            handleEdit={this.handleSave.bind(this, fieldName)}
          />
        )}
        <td>
          <button onClick={() => deleteListing(id)}>
            <span 
              className={classnames('glyphicon glyphicon-remove-circle', colors.grapefruit)}
            >
            </span>
          </button>
        </td>
      </tr>
    )
  }
}

export default Listing
