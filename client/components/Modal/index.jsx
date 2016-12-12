import React, { Component } from 'react'
import classnames from 'classnames'

class Modal extends Component {
  componentDidMount() {
    this.syncState()
  }

  componentDidUpdate(prevProps, prevState) {
    this.syncState()
  }

  syncState() {
    const $modal = window.$(this.modal)
    $modal.modal('setting', 'closable', !!this.props.closable)
    if (this.props.showing) {
      $modal.modal('show')
    } else {
      $modal.modal('hide')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div
        ref={c => (this.modal = c)}
        className={classnames('ui modal', classes)}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Modal
