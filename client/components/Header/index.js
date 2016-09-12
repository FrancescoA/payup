import React, { Component } from 'react'
import img from '../../../static/img/LogoExport.png'
import { prefixUrl } from '../../helpers/config'

class Header extends Component {
  render() {
    return (
      <div className='ui large menu'>
        <div className='ui container'>
          <div className='item'>
            <img className='ui image tiny' src={prefixUrl(img)}/>
          </div>
          <div className='right menu'>
            <div className='item'>
              FrancescoA
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
