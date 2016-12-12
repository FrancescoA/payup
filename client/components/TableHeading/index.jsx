import React, { Component } from 'react'

class TableHeading extends Component {
  render() {
    const { openAddModal } = this.props
    return (
      <div className='ui container'>
        <button
          className='ui basic green button fluid massive'
          onClick={() => openAddModal()}
        >
          <i className='cloud upload icon' />
          Add a Listing
        </button>
      </div>
    )
  }

}

export default TableHeading
