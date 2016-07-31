import React, { Component } from 'react'
import DropZone from 'react-dropzone'
import classnames from 'classnames'
import style from './style.css'

class FileDragArea extends Component {
  constructor(props, context) {
    super(props, context)

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
    this.state = {
      displayMode: 'default',
      iconMode: 'default',
      file: undefined
    }
  }

  onDropSuccess(files, e) {
    this.setState({
      displayMode: 'dropSuccess',
      file: files.length ? files[0] : undefined
    })
  }

  onDropFail(files, e) {
    this.setState({displayMode: 'dropFail'})
  }

  //way to transition back to default

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
    const { iconMode, file } = this.state
    if (iconMode == 'delete') {
      return 'trash outline'
    } else {
      return file ? this.iconForFileType(file.type) : 'cloud upload'
    }
  }

  handleIconClick() {
    if (this.state.iconMode == 'delete') {
      this.setState({
        iconMode: 'default',
        displayMode: 'default',
        file: undefined
      })
    }
  }

  render() {
    const { displayMode, file, iconMode } = this.state
    const iconName = file ? this.iconForFileType(file.type) : undefined
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
        <div className={style.fileInfoContainer}>
          <i 
          onMouseEnter={() => displayMode === 'dropSuccess' && this.setState({iconMode: 'delete'})}
          onMouseLeave={() => this.setState({iconMode: 'default'})}
          onClick={::this.handleIconClick}
          className={classnames(this.determineIcon(), style.fileIcon, 'icon huge', {
            blue: displayMode === 'default' || displayMode === 'dropSuccess',
            green: displayMode === 'dragEnter',
            red: displayMode === 'dropFail'
          })}/>
          <div>
            <h3>
              { 
                (() => {
                  switch (displayMode) {
                    case 'dragEnter': return 'Now drop it!'
                    case 'dropFail': return 'Oops! Something went wrong.'
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