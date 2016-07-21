import React, { Component } from 'react'
import DropZone from 'react-dropzone'
import classnames from 'classnames'
import style from './style.css'

class FileDragArea extends Component {
  constructor(props, context) {
    super(props, context)

    /**
     * Possible states:
     * default
     * dragEnter
     * dropSuccess
     * dropFail
     */
    this.state = {
      displayMode: 'default',
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

  render() {
    const { displayMode, file } = this.state
    const iconName = file ? this.iconForFileType(file.type) : undefined
    return (
      <DropZone
        multiple={false}
        disableClick={true}
        className={classnames(style.base, 'ui center aligned very padded container segment',{
          [style.dragEnter]: displayMode === 'dragEnter',
          [style.dropFail]: displayMode === 'dropFail'
        })}
        onDragEnter={() => this.setState({displayMode: 'dragEnter'})}
        onDropAccepted={::this.onDropSuccess}
        onDropRejected={::this.onDropFail}
      >
        <div className={style.fileInfoContainer}>
          <i className={classnames('icon huge', {
            blue: displayMode === 'default' || displayMode === 'dropSuccess',
            green: displayMode === 'dragEnter',
            red: displayMode === 'dropFail',
            'cloud upload': displayMode !== 'dropSuccess',
            [iconName]: displayMode === 'dropSuccess'
          })}/>
          <div>
            <h3>
              { 
                (() => {
                  if (file) {
                    return file.name
                  } else {
                    switch (displayMode) {
                      case 'dragEnter': return 'Now drop it!'
                      default: return 'Drag your file here!' 
                    }
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