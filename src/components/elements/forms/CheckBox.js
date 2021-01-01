import PropTypes from "prop-types"
import React from "react"
import { Field, ErrorMessage } from "formik"
import ErrorText from "./Error"

function CheckBox(props) {
  const { label, name, options, styles, ...rest } = props
  return (
    <div className={`relative text-sm my-4 ${styles}`}>
      <p className="my-2">{label}</p>
      <Field name={name}>
        {({ field }) => {
          return options.map((option, index) => {
            return (
              <label
                htmlFor={option}
                key={index}
                className="flex items-center mr-4"
              >
                <input
                  type="checkbox"
                  id={option}
                  {...field}
                  {...rest}
                  value={option}
                  className="w-4 h-4 mr-2 border-0 rounded-sm"
                  checked={field.value.includes(option)}
                />
                {option}
              </label>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name}>
        {msg => (
          <ErrorText style={{ top: "24px", fontSize: "12px" }}>{msg}</ErrorText>
        )}
      </ErrorMessage>
    </div>
  )
}

CheckBox.propTypes = {
  label: PropTypes.any,
  name: PropTypes.any,
  options: PropTypes.array,
  styles: PropTypes.any,
}

export default CheckBox
