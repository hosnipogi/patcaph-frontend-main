import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function RadioButtons(props) {
  const { label, name, options, errorstyles, ...rest } = props
  return (
    <div>
      <ErrorMessage
        component={ErrorText}
        errorstyles={errorstyles}
        name={name}
      />
      <h6 className="mb-1">{label}</h6>
      <Field name={name}>
        {({ field }) => {
          return options.map((option, index) => {
            return (
              <label
                htmlFor={option}
                key={index}
                className="block mr-4 hover:text-blue-600"
              >
                <input
                  type="radio"
                  id={option}
                  {...field}
                  {...rest}
                  value={option}
                  className="mr-2 hover:bg-blue-300"
                  checked={field.value === option}
                />
                {option}
              </label>
            )
          })
        }}
      </Field>
    </div>
  )
}

RadioButtons.propTypes = {
  errorstyles: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  options: PropTypes.array,
}

export default RadioButtons
