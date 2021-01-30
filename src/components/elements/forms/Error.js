import PropTypes from "prop-types"
import React from "react"

function TextError(props) {
  const { children, errorstyles } = props
  return (
    <span
      className={`text-red-600 text-xs font-medium ${
        errorstyles && errorstyles
      }`}
    >
      {children}
    </span>
  )
}

TextError.propTypes = {
  children: PropTypes.node,
  errorstyles: PropTypes.string,
}

export default TextError
