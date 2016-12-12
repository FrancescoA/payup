import React, { Component } from 'react'
import style from './style.css'

class ListingTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newListing) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    const text = e.target.value.trim()
    if (!this.props.newListing) {
      this.props.onSave(text)
    }
  }

  render() {
    // const classes = classnames({
    //   [style.edit]: this.props.editing,
    //   [style.new]: this.props.newListing
    // }, style.normal)
    return (
      <input
        className={style.edit}
        type='text'
        autoFocus='true'
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}

export default ListingTextInput
