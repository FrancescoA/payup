import React, { Component } from 'react'
import DropZone from 'react-dropzone'
import classnames from 'classnames'
import style from './style.css'

const createDefaultDragAreaState = () => {
  return {
    displayMode: 'default',
    iconMode: 'default',
    file: null
  }
}

/**
 * Possible displayModes:
 * default
 * dragEnter
 * dropSuccess
 * dropFail
 *
 * Possible iconModes:
 * default
 * delete
 */
class FileDragArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.stateForFile(props.file)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReset) {
      this.setState(createDefaultDragAreaState())
    } else {
      this.setState(this.stateForFile(nextProps.file))
    }
  }

  stateForFile(file) {
    return {
      displayMode: file ? 'dropSuccess' : 'default',
      iconMode: 'default',
    }
  }

  onDropSuccess(files, e) {
    const file = files.length ? files[0] : null
    this.props.onDropSuccess(file, e)
  }

  onDropFail(files, e) {
    this.setState({displayMode: 'dropFail'})
  }

  supportsAdvancedUpload() {
    const div = document.createElement('div')
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }

  iconForFileType(type) {
    switch (type.split('/')[0]){
      case 'text': return 'file text outline'
      case 'image': return 'file image outline'
      case 'audio': return 'file audio outline'
      case 'application': return 'file pdf outline'
      default: return 'file outline'
    }
  } 

  determineIcon() {
    const { iconMode } = this.state
    const { file } = this.props
    if (iconMode == 'delete') {
      return 'trash outline'
    } else {
      return file ? this.iconForFileType(file.type) : 'cloud upload'
    }
  }

  handleIconClick() {
    if (this.state.iconMode == 'delete') {
      this.props.onFileDelete()
    }
  }

  render() {
    const { displayMode, iconMode } = this.state
    const { file } = this.props
    return (
      <DropZone
        multiple={false}
        disableClick={iconMode === 'delete'}
        className={classnames(style.base, 'ui center aligned very padded container segment',{
          [style.dragEnter]: displayMode === 'dragEnter',
          [style.dropFail]: displayMode === 'dropFail'
        })}
        onDragEnter={() => this.setState({displayMode: 'dragEnter'})}
        onDragLeave={() => this.setState({displayMode: 'default'})}
        onDropAccepted={::this.onDropSuccess}
        onDropRejected={::this.onDropFail}
      >
        <div 
          className={style.fileInfoContainer}
          onMouseEnter={() => displayMode === 'dropSuccess' && this.setState({iconMode: 'delete'})}
          onMouseLeave={() => this.setState({iconMode: 'default'})}
          onClick={::this.handleIconClick}
        >
          <i 
          className={classnames(this.determineIcon(), 'icon huge', {
            blue: displayMode === 'default' || displayMode === 'dropSuccess',
            green: displayMode === 'dragEnter',
            red: displayMode === 'dropFail'
          })}/>
          <div>
            <h3>
              { 
                (() => { // TODO: Display file.size = # bytes
                  switch (displayMode) {
                    case 'dragEnter': return 'Now drop it!'
                    case 'dropFail': return 'Oops! Something went wrong. Please try again. '
                    default: return file ? file.name : 'Click or drag your file here!' 
                  }
                })()  
              }
            </h3>
          </div>
        </div>
      </DropZone>
    )
  }
}

export default FileDragArea