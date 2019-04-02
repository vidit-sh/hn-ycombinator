import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

function Button ({ type, children, ...otherProps }) {
  return (
    <button type={type || 'button'} {...otherProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Button
