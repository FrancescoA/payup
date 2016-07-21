import React, { Component } from 'react'
import classnames from 'classnames'


class SliderToggle extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: this.props.checked
    }
  }

  componentDidMount() {
    $(this.refs.checkbox).checkbox()
  }

  handleToggle() {
    this.props.onSave(!this.state.checked)
  }

  render() {
    const { checked } = this.state
    const { classes, label } = this.props
    return (
      <div 
        className={classnames('ui checkbox toggle', classes, {checked: checked})}
        onClick={() => this.handleToggle()}
      >
        <input 
          type='checkbox' 
          tabIndex="0"
          defaultChecked={checked}
          />
        <label> {label} </label>
      </div>
    )

  }
}

export default SliderToggle