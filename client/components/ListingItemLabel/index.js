import React, { Component } from 'react'
import style from './style.css'

class ListingItemLabel extends Component {

  render() {
    const {handleDoubleClick, text} = this.props
    return (
     <div className={style.view} onDoubleClick={handleDoubleClick}>
      {text.length == 0 ? 'Untitled' : text}
     </div>
    )
  }
}

export default ListingItemLabel