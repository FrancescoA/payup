import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import classnames from 'classnames'
import style from './style.css'

class Footer extends Component {
  render() {
    return (
      <footer className={classnames('ui footer bottom attached', style.footer)}>
        <Container className={style.content} textAlign='center'>
          <h2>Sell whatever, wherever</h2>
        </Container>
      </footer>
    )
  }
}

export default Footer
