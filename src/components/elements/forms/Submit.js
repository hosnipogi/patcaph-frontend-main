import React from "react"
import PropTypes from "prop-types"
import Loading from "../../loading"

const Submit = ({ label, disabled, isSubmitting, styles, style }) => {
  return (
    <>
      {!isSubmitting ? (
        <button
          type="submit"
          className={`w-full text-lg p-4 rounded-lg mb-4 block transition-colors duration-100 ${
            !disabled ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"
          } cursor-pointer text-white ${styles}`}
          disabled={disabled}
          style={style}
        >
          {label}
        </button>
      ) : (
        <Loading inline={true} />
      )}
    </>
  )
}

Submit.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  styles: PropTypes.string,
  style: PropTypes.any,
}

Submit.defaultProps = {
  label: "",
  disabled: false,
  isSubmitting: false,
  styles: "",
  style: {},
}

export default Submit
