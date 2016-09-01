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
      minimum: 4
    },
  },
  filename: {
    presence: { 
      message: 'is required',
    },
  },
}

const createDefaultFormState = () => {
  return {
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

class ListingForm extends Component {
  constructor(props, context) {
    super(props, context)
    const initialForm = this.getNewFormDataOrDefault(this.props)
    this.state = {
      formErrors: {},
      form: initialForm
    }
  }

  componentWillReceiveProps(nextProps) {
    const newForm = this.getNewFormDataOrDefault(nextProps)
    this.setState({
      form: newForm
    })
  }

  getNewFormDataOrDefault(props) {
    return props.defaultFormData
      ? Object.assign({}, props.defaultFormData)
      : createDefaultFormState()
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setFormField(name, value)
  }

  setFormField(name, value) {
    this.setState(previousState => {
      previousState.form[name] = value
      return previousState
    })
  }

  setFormState(form) {
    this.setState(previousState => {
      previousState.form = form
      return previousState
    })
  }

  handleFileDropSuccess(file, event) {
    // TODO: figure out exactly what to do with file
    this.setFormField('filename', file.name)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { form } = this.state
    const errors = validate(form, formConstraints)
    this.setState({formErrors: errors || {}})

    if (!errors) {
      this.props.handleSubmit && this.props.handleSubmit(form)
      this.setFormState(createDefaultFormState())
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
            <input onChange={::this.handleChange} type='text' value={form.title} name='title' maxLength='64'/>
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
              onSave={(val) => this.setFormField('live', val)}
              label='Live' 
            />
            <SliderToggle
              checked={form.noSellLimit}
              onSave={(val) => this.setFormField('noSellLimit', val)}
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