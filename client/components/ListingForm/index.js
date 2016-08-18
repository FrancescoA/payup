import React, { Component } from 'react'
import SliderToggle from '../SliderToggle'
import FileDragArea from '../FileDragArea'
import classnames from 'classnames'
import style from './style.css'
import validate from 'validate.js'
import _ from 'underscore'

const formConstraints = {
  title: {
    presence: true,
    length: {
      minimum: 10
    },
  },
  filename: {
    presence: { 
      message: 'is required',
    },
  },
}

const createDefaultState = () => {
  return {
    formErrors: {},
    form: {
      id: 'some-random-id',
      title: '',
      filename: '',
      fileurl: '',
      amountToSell: 1, 
      noSellLimit: true,
      price: 0, 
      description: '',
      live: false,
    }
  }
}

class ListingForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = createDefaultState()
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setFormState(name, value)
  }

  setFormState(name, value) {
    this.setState((previousState, currentProps) => {
      previousState.form[name] = value
      return previousState
    })
  }

  handleFileDropSuccess(file, event) {
    // TODO: figure out exactly what to do with file
    this.setFormState('filename', file.name)
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = validate(this.state.form, formConstraints)
    this.setState({formErrors: errors})

    if (!errors) {
      this.props.handleSubmit && this.props.handleSubmit(this.state.form)
      this.setState(createDefaultState())
    }
  }

  render() {
    const { form, formErrors } = this.state
    return (
      <div className={this.props.classes}>
        <FileDragArea onDropSuccess={::this.handleFileDropSuccess}/>
        <form className={classnames('ui form', {error: !_.isEmpty(formErrors)})}>
          <div className={classnames('field', {error: formErrors.title})}>
            <label>Title</label>
            <input onChange={::this.handleChange} type='text' value={form.alias} name='title' placeholder='' maxLength='64'/>
          </div>
          <div className='two fields'>
            <div className={classnames('field', {disabled: form.noSellLimit})}>
              <label> Amount To Sell </label>
              <input onChange={::this.handleChange} type='number' value={form.amountToSell} name='amountToSell' min='1'/>
            </div>
            <div className='field'>
              <label> Price </label>
              <input onChange={::this.handleChange} type='number' value={form.price} name='price' min='0'/>
            </div>
          </div>
          <div className='field'>
            <label> Description </label>
            <textarea onChange={::this.handleChange} rows="3" value={form.description} name='description' maxLength='1024'></textarea>
          </div>
          <div className='inline field'>
            <SliderToggle
              checked={form.live}
              onSave={(val) => this.setFormState('live', val)}
              label='Live' 
            />
            <SliderToggle
              checked={form.noSellLimit}
              onSave={(val) => this.setFormState('noSellLimit', val)}
              label='Sell unlimited'
              classes={style.checkbox}
            />
          </div>
          <button onClick={::this.handleSubmit} className='ui button'>Submit</button>
          <div className='ui error message'>
            <ul>
              {_.flatten(Object.values(formErrors)).map(errorMessage => 
                <li key={errorMessage}> {errorMessage} </li>
              )}
            </ul>
          </div>
        </form>
      </div>
    )
  }
}

export default ListingForm