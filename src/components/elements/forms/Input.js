import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function Input(props) {
  const { label, name, styles, errorstyles, formik, ...rest } = props
  const errors = formik.errors[name]
  const touched = formik.touched[name]

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
        className={`w-full border border-gray-300 p-4 rounded-lg mb-4 block hover:border-gray-400 ${
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
  errorstyles: PropTypes.any,
  formik: PropTypes.shape({
    errors: PropTypes.any,
    touched: PropTypes.any,
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  styles: PropTypes.any,
}

export default Input
