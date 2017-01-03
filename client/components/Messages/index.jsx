import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Message } from 'semantic-ui-react'

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
          <Message error
            key={index}
            onDismiss={() => removeMessage(message)}
            header={header}
            content={text}
          />
        )
      })}
    </div>
  )
}

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
