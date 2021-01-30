import PropTypes from "prop-types"
import React from "react"
import { ErrorMessage } from "formik"
import ErrorText from "./Error"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { parseISO, format } from "date-fns"

const errorstyles = "relative text-right"

const DateInput = props => {
  const { formik, name, label, selected, ...rest } = props
  const errors = name.includes("facility")
    ? formik.errors?.facility?.length
    : formik.errors[name]
  const touched = name.includes("facility")
    ? formik.touched?.facility?.length
    : formik.touched[name]

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2">
        {label && (
          <h6 className="mb-1">
            <label htmlFor={name}>{label}</label>
          </h6>
        )}
        <ErrorMessage
          component={ErrorText}
          errorstyles={`${errorstyles} ${!label ? "col-span-2" : "text-right"}`}
          name={name}
        />
      </div>
      <DatePicker
        id={name}
        className={`border border-gray-300 p-4 rounded-lg mb-4 block hover:border-gray-400 w-full ${
          errors && touched
            ? "border-red-200 bg-red-100"
            : !errors && touched
            ? "border-green-300 bg-green-100"
            : ""
        }`}
        selected={
          selected
            ? parseISO(selected)
            : formik.values[name]
            ? parseISO(formik.values[name])
            : ""
        }
        placeholderText="YYYY-MM-DD"
        showYearDropdown
        yearDropdownItemNumber={35}
        scrollableYearDropdown
        onChange={date =>
          formik.setFieldValue(name, date ? format(date, "yyyy-MM-dd") : "")
        }
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
        {...rest}
      />
    </div>
  )
}

DateInput.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.any,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
    touched: PropTypes.any,
    values: PropTypes.any,
  }),
  label: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
}

export default DateInput
