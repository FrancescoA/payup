import React, { Component } from 'react'
import FileDragArea from '../FileDragArea'
import style from './style.css'

class TableHeading extends Component {
  render() {
    const { openAddEditModal } = this.props
    return (
      <div className='ui container'>
        <button 
          className='ui basic green button fluid massive'
          onClick={openAddEditModal}
        > 
          <i className='cloud upload icon'/>
          Add a Listing 
        </button>
        <FileDragArea/>
      </div>
    )
  }

}

export default TableHeading