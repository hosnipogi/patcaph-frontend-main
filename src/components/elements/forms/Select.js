import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function Select(props) {
  const { label, name, options, formik, errorstyles, styles, ...rest } = props
  const errors = name.includes("facility")
    ? formik.errors?.facility?.length
    : formik.errors[name]
  const touched = name.includes("facility")
    ? formik.touched?.facility?.length
    : formik.touched[name]

  return (
    <div className="relative mb-4">
      <div className="grid grid-cols-2">
        <h6 className="mb-1">{label}</h6>
        <ErrorMessage
          component={ErrorText}
          errorstyles={`${errorstyles} ${!label ? 'col-span-2' : 'text-right'}`}
          name={name}
        />
      </div>
      <Field
        as="select"
        name={name}
        id={name}
        className={`select-css border border-gray-200 p-4 rounded-lg mb-4 bg-white hover:border-gray-400 ${
          errors && touched
            ? "border-red-200 bg-red-100"
            : !errors && touched
            ? "border-green-300 bg-green-100"
            : null
        } ${styles && styles}`}
        {...rest}
      >
        {options !== null && Array.isArray(options) && options[0] !== "" ? (
          <>
            <option>Select {label}..</option>
            {options.map((option, index) => (
              <option key={index} value={option} className="block w-full">
                {option}
              </option>
            ))}
          </>
        ) : (
          <option>Select Area..</option>
        )}
      </Field>
    </div>
  )
}

Select.propTypes = {
  errorstyles: PropTypes.any,
  formik: PropTypes.shape({
    errors: PropTypes.any,
    touched: PropTypes.any,
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  options: PropTypes.any,
  styles: PropTypes.any,
}

export default Select
