import React, { Component } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import style from './style.css'

class App extends Component {
  render() {
    const contentStyle = {
      height: '100%'
    }
    const { children } = this.props
    return (
      <div className={style.normal}>
        <Header/>
        <div className='container-fluid' style={contentStyle}>
          {children}
        </div>
      </div>
    )
  }
}

export default App
