import React from 'react'
import classnames from 'classnames'

const SimpleDropdown = (props) => {
  const { title, children } = props
  return (
    <div
      className={classnames('item', {
        'ui simple dropdown': !!children,
      })}
    >
      {title}
      {!!children && <i className='dropdown icon' />}
      <div className='menu'>
        {children}
      </div>
    </div>
  )
}

export default SimpleDropdown
