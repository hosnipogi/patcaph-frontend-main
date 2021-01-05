import PropTypes from "prop-types"
import React from "react"
import Input from "./Input"
import RadioButtons from "./RadioButtons"
import CheckBox from "./CheckBox"
import Select from "./Select"
import Textarea from "./Textarea"
import DateInput from "./DateInput"

function FormControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    case "date":
      return <DateInput {...rest} />
    case "radio":
      return <RadioButtons {...rest} />
    case "checkbox":
      return <CheckBox {...rest} />
    case "select":
      return <Select {...rest} />
    case "textarea":
      return <Textarea {...rest} />
    default:
      return null
  }
}

FormControl.propTypes = {
  control: PropTypes.string,
}

export default FormControl
