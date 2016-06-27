import React, { Component } from 'react'
import {Checkbox} from 'react-semantify'
import classnames from 'classnames'


class SliderToggle extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: this.props.value
    }
  }

  handleToggle() {
    this.props.onSave(!this.state.checked)
  }

  render() {
    const { checked } = this.state
    return (
      <Checkbox 
        init={true} 
        className={classnames('fitted toggle', {checked: checked})}
        onClick={() => this.handleToggle()}
        >
        <input 
          type='checkbox' 
          defaultChecked={checked}
          />
        <label/>
      </Checkbox>
    )

  }
}

export default SliderToggle