import React, { Component } from 'react'
import classnames from 'classnames'
import { Checkbox } from 'semantic-ui-react'


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
      <Checkbox toggle
        className='classes'
        checked={checked}
        onChange={this.handleToggle}
        label={label}
      />
    )
  }
}

export default SliderToggle
