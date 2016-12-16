import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { removeFailedRequest } from '../../actions/loadingState'
import { errorTypeToMessage } from '../../constants/mappings'

const Messages = ({ messages, removeMessage }) => {
  const style = {
    marginBottom: '14px',
  }
  return (
    <div style={style}>
      {messages.map((message, index) => {
        const { header, text } = errorTypeToMessage[message.type]
        return (
          <Message 
            key={index} 
            close={() => removeMessage(message)}
            type='error'
            header={header}
            text={text}
          />
        )
      })}
    </div>
  )
}


const Message = ({ header, text, type, close }) => (
  <div className={classnames('ui message', type)}>
    <i className='close icon' onClick={close}/>
    <div className='header'>
      {header}
    </div>
    <p> {text} </p>
  </div>
)

function mapStateToProps(state) {
  return {
    messages: state.loadingState.failedRequests,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeMessage: bindActionCreators(removeFailedRequest, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)