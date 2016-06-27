import React, { Component } from 'react'
import style from './style.css'

class TableHeading extends Component {
  render() {
    return (
      <div>
        <button className='ui basic green button'> 
          <i className='cloud upload icon'/>
          Add File 
        </button>
      </div>
    )
  }

}


export default TableHeading