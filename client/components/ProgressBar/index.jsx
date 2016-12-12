import React, { Component } from 'react'
import classnames from 'classnames'

class ProgressBar extends Component {

  componentDidMount() {
    window.$(this.bar).progress()
  }

  render() {
    const { color, percent, size } = this.props
    return (
      <div
        className={classnames('ui progress', color, size)}
        data-percent={percent}
        ref={c => (this.bar = c)}
      >
        <div className='bar' />
      </div>
    )
  }
}

export default ProgressBar
