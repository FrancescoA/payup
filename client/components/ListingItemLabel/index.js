import React, { Component } from 'react'
import style from './style.css'

class ListingItemLabel extends Component {

  render() {
    const {handleDoubleClick, text} = this.props
    return (
      <div className={style.view}>
        <span onDoubleClick={handleDoubleClick}>
          {text}
        </span>
        {/*<button className={style.destroy} onClick={() => deleteListing(listing.id)} />*/}
      </div>
    )
  }
}

export default ListingItemLabel