import React, { Component } from 'react'
import style from './style.css'

class ListingItemLabel extends Component {

  render() {
    const {handleDoubleClick, deleteListing, text} = this.props
    return (
      <div className={style.view}>
        <label onDoubleClick={handleDoubleClick}>
          {text}
        </label>
        {/*<button className={style.destroy} onClick={() => deleteListing(listing.id)} />*/}
      </div>
    )
  }
}

export default ListingItemLabel