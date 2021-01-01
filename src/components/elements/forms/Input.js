import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function Input(props) {
  const { label, name, errors, touched, styles, errorstyles, ...rest } = props
  return (
    <div className="relative w-full">
      {label && (
        <h6 className="mb-1">
          <label htmlFor={name}>{label}</label>
        </h6>
      )}
      <ErrorMessage
        component={ErrorText}
        errorstyles={errorstyles}
        name={name}
      />
      <Field
        id={name}
        name={name}
        className={`w-full border-2 border-gray-200 p-4 rounded-lg mb-4 block hover:border-gray-300 ${
          errors && touched
            ? "border-red-200 bg-red-100"
            : !errors && touched
            ? "border-green-300 bg-green-100"
            : ""
        } ${styles && styles}`}
        {...rest}
      />
    </div>
  )
}

Input.propTypes = {
  errors: PropTypes.any,
  errorstyles: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  styles: PropTypes.any,
  touched: PropTypes.any,
}

export default Input
