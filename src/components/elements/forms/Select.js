import PropTypes from "prop-types";
import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorText from "./Error";

function Select(props) {
    const {
        label,
        name,
        options,
        errors,
        touched,
        errorstyles,
        styles,
        ...rest
    } = props;
    return (
        <div className="relative mb-4">
            <ErrorMessage
                component={ErrorText}
                errorstyles={errorstyles}
                name={name}
            />
            <h6 className="mb-1">{label}</h6>
            <Field
                as="select"
                name={name}
                id={name}
                className={`select-css border-2 border-gray-200 p-4 rounded-lg mb-4 bg-white hover:border-gray-400 ${
                    errors && touched
                        ? "border-red-200 bg-red-100"
                        : !errors && touched
                        ? "border-green-300 bg-green-100"
                        : null
                } ${styles && styles}`}
                {...rest}
            >
                {options !== null &&
                Array.isArray(options) &&
                options[0] !== "" ? (
                    <>
                        <option>Select {label}..</option>
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={option}
                                className="block w-full"
                            >
                                {option}
                            </option>
                        ))}
                    </>
                ) : (
                    <option>Select Area..</option>
                )}
            </Field>
        </div>
    );
}

Select.propTypes = {
  errors: PropTypes.any,
  errorstyles: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  options: PropTypes.array,
  styles: PropTypes.any,
  touched: PropTypes.any
}

export default Select;
