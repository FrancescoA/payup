import React, { Component } from 'react'
import classnames from 'classnames'


class SliderToggle extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: this.props.value
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
    return (
      <div 
        className={classnames('ui checkbox fitted toggle', {checked: checked})}
        onClick={() => this.handleToggle()}
      >
        <input 
          type='checkbox' 
          defaultChecked={checked}
          />
        <label/>
      </div>
    )

  }
}

export default SliderToggle