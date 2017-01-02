import React, { Component } from 'react'
import classnames from 'classnames'
import CurrencyInput from 'react-currency-masked-input'
import validate from 'validate.js'
import _ from 'underscore'
import { Form, Button, Message } from 'semantic-ui-react'
import SliderToggle from '../SliderToggle'
import FileDragArea from '../FileDragArea'
import style from './style.css'

const formConstraints = {
  title: {
    presence: true,
    length: {
      minimum: 4,
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
    fileSize: '',
    fileType: '',
    amountToSell: 1,
    noSellLimit: false,
    sold: 0,
    price: '0.00',
    description: '',
    live: true,
  }
}

class ListingForm extends Component {
  static getNewFormDataOrDefault(props) {
    return props.defaultFormData
      ? Object.assign({}, props.defaultFormData)
      : createDefaultFormState()
  }

  constructor(props, context) {
    super(props, context)
    const initialForm = ListingForm.getNewFormDataOrDefault(this.props)
    this.state = {
      formErrors: {},
      form: initialForm,
      newFile: null,
    }
    this.handleFileDropSuccess = this.handleFileDropSuccess.bind(this)
    this.handleFileDelete = this.handleFileDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const newForm = ListingForm.getNewFormDataOrDefault(nextProps)
    this.setState({
      formErrors: {},
      form: newForm,
      newFile: null,
    })
  }

  setFormField(name, value) {
    this.setState((previousState) => {
      previousState.form[name] = value
      return previousState
    })
  }

  setFormState(form) {
    this.setState((previousState) => {
      previousState.form = Object.assign({}, previousState.form, form)
      return previousState
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setFormField(name, value)
  }

  hasAllFileInfo() {
    const { filename, fileSize, fileType } = this.state.form
    return filename && fileSize && fileType
  }

  createMockFile() {
    // The FileDragArea wants something that looks like a File
    const { filename, fileSize, fileType } = this.state.form
    return this.hasAllFileInfo() ? {
      name: filename,
      size: fileSize,
      type: fileType,
    } : null
  }

  handleFileDropSuccess(file, event) {
    this.setState({ newFile: file })
    this.setFormState({
      filename: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  }

  handleFileDelete() {
    this.setFormState({
      filename: '',
      fileSize: '',
      fileType: '',
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { form } = this.state
    const errors = validate(form, formConstraints)
    this.setState({ formErrors: errors || {} })

    if (!errors) {
      const timeStampedListing = Object.assign(form, { dateCreated: Date.now() })
      if (this.props.handleSubmit) this.props.handleSubmit(timeStampedListing, this.state.newFile)
      this.setFormState(createDefaultFormState())
    }
  }

  render() {
    const { form, formErrors } = this.state
    return (
      <div className={this.props.classes}>
        <FileDragArea
          file={this.createMockFile()}
          isUploading={this.props.isFileUploading}
          percentLoading={this.props.fileUploadingPercentage}
          onDropSuccess={this.handleFileDropSuccess}
          onFileDelete={this.handleFileDelete}
        />
        <Form error={!_.isEmpty(formErrors)}>
          <Form.Field error= {formErrors.title}>
            <label htmlFor='title'>Title</label>
            <input onChange={this.handleChange} type='text' value={form.title} name='title' maxLength='64' />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field disabled={form.noSellLimit}>
              <label htmlFor='amountToSell'> Amount To Sell </label>
              <input onChange={this.handleChange} type='number' value={form.amountToSell} name='amountToSell' min='1' />
            </Form.Field>
            <Form.Field>
              <label htmlFor='price'> Price ($) </label>
              <CurrencyInput
                name='price'
                onChange={(event, value) => {
                  event.target.value = value
                  this.handleChange(event)
                }}
                value={form.price}
                min='0.00'
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label htmlFor='description'> Description </label>
            <textarea onChange={this.handleChange} rows='3' value={form.description} name='description' maxLength='1024' />
          </Form.Field>
          <Form.Field inline>
            <SliderToggle
              checked={form.live}
              onSave={val => this.setFormField('live', val)}
              label='Live'
            />
            <SliderToggle
              checked={form.noSellLimit}
              onSave={val => this.setFormField('noSellLimit', val)}
              label='Sell unlimited'
              classes={style.checkbox}
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Submit</Button>
          <Message error>
            <Message.List>
              {_.flatten(Object.values(formErrors)).map(errorMessage =>
                <Message.Item key={errorMessage}> {errorMessage} </Message.Item>
              )}
            </Message.List>
          </Message>
        </Form>
      </div>
    )
  }
}

export default ListingForm
