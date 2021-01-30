import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function Textarea(props) {
  const { label, name, formik, errorstyles, styles, ...rest } = props
  const errors = formik.errors[name]
  const touched = formik.touched[name]

  return (
    <div className="relative">
      <div className="grid grid-cols-2">
        <h6 className="mb-2">{label}</h6>
        <ErrorMessage
          component={ErrorText}
          errorstyles={`${errorstyles} ${
            !label ? "col-span-2 text-left" : "text-right"
          }`}
          name={name}
        />
      </div>
      <Field
        as="textarea"
        name={name}
        id={name}
        className={`w-full text-lg border border-gray-300 hover:border-gray-400 p-4 rounded-lg mb-4 block ${
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
  errorstyles: PropTypes.any,
  formik: PropTypes.shape({
    errors: PropTypes.any,
    touched: PropTypes.any,
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  styles: PropTypes.any,
}

export default Textarea
