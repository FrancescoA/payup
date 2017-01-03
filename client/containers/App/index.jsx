import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
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
        <Container fluid style={contentStyle}>
          {children}
        </Container>
        <Footer />
      </div>
    )
  }
}

export default App
