import React, { Component } from 'react'
import DropZone from 'react-dropzone'
import { Icon } from 'semantic-ui-react'
import classnames from 'classnames'
import { Line } from 'rc-progress'
import style from './style.css'

const createDefaultDragAreaState = () => {
  return {
    displayMode: 'default',
    iconMode: 'default',
    file: null,
  }
}

/**
 * Possible displayModes:
 * default
 * dragEnter
 * dropSuccess
 * dropFail
 * uploadingFile
 *
 * Possible iconModes:
 * default
 * delete
 * uploadingFile
 */
class FileDragArea extends Component {
  static stateForFile(file, isUploading) {
    if (isUploading) {
      return {
        displayMode: 'uploadingFile',
        iconMode: 'uploadingFile',
      }
    }
    return {
      displayMode: file ? 'dropSuccess' : 'default',
      iconMode: 'default',
    }
  }

  static supportsAdvancedUpload() {
    const div = document.createElement('div')
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
  }

  static iconForFileType(type) {
    switch (type.split('/')[0]) {
      case 'text': return 'file text outline'
      case 'image': return 'file image outline'
      case 'audio': return 'file audio outline'
      case 'application': return 'file pdf outline'
      default: return 'file outline'
    }
  }

  constructor(props, context) {
    super(props, context)
    this.state = FileDragArea.stateForFile(props.file, props.isUploading)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReset) {
      this.setState(createDefaultDragAreaState())
    } else {
      this.setState(FileDragArea.stateForFile(nextProps.file, nextProps.isUploading))
    }
  }

  onDropSuccess(files, e) {
    const file = files.length ? files[0] : null
    this.props.onDropSuccess(file, e)
  }

  onDropFail(files, e) {
    this.setState({ displayMode: 'dropFail' })
  }

  determineIcon() {
    const { iconMode } = this.state
    const { file } = this.props
    switch (iconMode) {
      case 'delete': return 'trash outline'
      case 'uploadingFile': return 'loading refresh'
      default: return file ? FileDragArea.iconForFileType(file.type) : 'cloud upload'
    }
  }

  handleIconClick() {
    if (this.state.iconMode === 'delete') {
      this.props.onFileDelete()
    }
  }

  render() {
    const { displayMode, iconMode } = this.state
    const { file, percentLoading } = this.props
    return (
      <DropZone
        multiple={false}
        disableClick={iconMode === 'delete'}
        className={classnames(style.base, 'ui center aligned very padded container segment', {
          [style.dragEnter]: displayMode === 'dragEnter',
          [style.fileUploading]: displayMode === 'uploadingFile',
          [style.dropFail]: displayMode === 'dropFail',
        })}
        onDragEnter={() => this.setState({ displayMode: 'dragEnter' })}
        onDragLeave={() => this.setState({ displayMode: 'default' })}
        onDropAccepted={this.onDropSuccess.bind(this)}
        onDropRejected={this.onDropFail.bind(this)}
      >
        <div
          className={style.fileInfoContainer}
          onMouseEnter={() => displayMode === 'dropSuccess' && this.setState({ iconMode: 'delete' })}
          onMouseLeave={() => displayMode !== 'uploadingFile' && this.setState({ iconMode: 'default' })}
          onClick={this.handleIconClick.bind(this)}
        >
          <Icon
            size='huge'
            className={classnames(this.determineIcon(), {
              blue: displayMode === 'default' || displayMode === 'dropSuccess',
              green: displayMode === 'dragEnter' || displayMode === 'uploadingFile',
              red: displayMode === 'dropFail',
            })}
          />
          <div>
            <h3>
              {
                (() => { // TODO: Display file.size = # bytes
                  switch (displayMode) {
                    case 'dragEnter': return 'Now drop it!'
                    case 'uploadingFile': return 'Uploading your file!'
                    case 'dropFail': return 'Oops! Something went wrong. Please try again.'
                    default: return file ? file.name : 'Click or drag your file here!'
                  }
                })()
              }
            </h3>
          </div>
          {displayMode === 'uploadingFile' && <Line percent={percentLoading} strokeColor='#21BA45' />}
        </div>
      </DropZone>
    )
  }
}

export default FileDragArea
