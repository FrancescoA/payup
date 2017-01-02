import React, { Component } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Messages from '../../components/Messages'
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
        <Messages />
        <div className='container-fluid' style={contentStyle}>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
