import React, { Component } from 'react'
import classnames from 'classnames'


class SliderToggle extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: this.props.checked,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({ checked: props.checked })
  }

  handleToggle() {
    const { checked } = this.state
    this.setState({ checked: !checked }, () => {
      if (this.props.onSave) this.props.onSave(this.state.checked)
    })
  }

  render() {
    const { checked } = this.state
    const { classes, label } = this.props
    return (
      <div
        className={classnames('ui checkbox toggle', classes, { checked })}
      >
        <input
          type='checkbox'
          checked={checked}
          onChange={this.handleToggle}
        />
        <label htmlFor='checkbox'> {label} </label>
      </div>
    )
  }
}

export default SliderToggle
