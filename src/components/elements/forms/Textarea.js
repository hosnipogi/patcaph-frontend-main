import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function Textarea(props) {
  const { label, name, errors, touched, errorstyles, styles, ...rest } = props
  return (
    <div className="relative">
      <ErrorMessage
        component={ErrorText}
        errorstyles={errorstyles}
        name={name}
      />
      <h6 className="mb-2">{label}</h6>
      <Field
        as="textarea"
        name={name}
        id={name}
        className={`w-full text-lg border-2 border-gray-200 p-4 rounded-lg mb-4 block ${
          errors && touched
            ? "border-red-200 bg-red-100"
            : !errors && touched
            ? "border-green-300 bg-green-100"
            : null
        } ${styles ? styles : null}`}
        {...rest}
      />
    </div>
  )
}

Textarea.propTypes = {
  errors: PropTypes.any,
  errorstyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  styles: PropTypes.string,
  touched: PropTypes.bool,
}

export default Textarea
