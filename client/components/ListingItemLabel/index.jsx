import React, { Component } from 'react'
import style from './style.css'

const ListingItemLabel = ({ handleDoubleClick, text }) => (
  <div className={style.view} onDoubleClick={handleDoubleClick}>
    {text.length === 0 ? 'Untitled' : text}
  </div>
)

export default ListingItemLabel
