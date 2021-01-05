import React, { useContext, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { FormContext } from "../../contexts/FormContext"
import FormControl from "../../components/elements/forms/FormControl"
import filterInput from "../../lib/utils/filterInput"
import { RightArrowIcon } from "../icons/"
import { Card } from "@windmill/react-ui"

function PersonalInformation() {
  const telephoneInput = useRef(null)
  const { formik, stuffForChildren } = useContext(FormContext)
  const { fields } = stuffForChildren
  const { gender, civil_status } = fields

  useEffect(() => {
    filterInput(telephoneInput.current, value => /^\+?[0-9\s]*$/.test(value))
  }, [])

  return (
    <div className="flex flex-col">
      <Card className="grid-cols-3 gap-4 pt-4 lg:border lg:px-4 lg:grid">
        <FormControl
          control="input"
          type="text"
          name="firstname"
          label="First name"
          placeholder="José"
          formik={formik}
        />
        <FormControl
          control="input"
          type="text"
          name="middlename"
          label="Middle name"
          placeholder="Protasio"
          formik={formik}
        />
        <FormControl
          control="input"
          type="text"
          name="surname"
          label="Surname"
          placeholder="Rizal"
          formik={formik}
        />
      </Card>
      <Card className="pt-4 my-4 overflow-visible lg:border lg:px-4">
        <FormControl
          control="input"
          type="text"
          name="address"
          label="Address"
          placeholder="House number, Street [Barangay,] City, [Country]"
          formik={formik}
        />
        <FormControl
          control="input"
          type="tel"
          name="contactNumber"
          label="Contact Number"
          placeholder="915 123 4567"
          formik={formik}
          innerRef={telephoneInput}
        />
        <div className="grid grid-cols-3 mt-4 text-gray-700">
          <FormControl
            control="radio"
            name="gender"
            label="Gender"
            options={gender}
            errorstyles="relative"
          />
          <FormControl
            control="radio"
            name="civilStatus"
            label="Civil Status"
            options={civil_status}
            errorstyles="relative"
          />
        </div>
        <div className="grid-cols-3 gap-4 mt-8 lg:grid">
          <FormControl
            label="Birthday"
            control="date"
            name="birthday"
            maxDate={new Date("January 1, 2002")}
            formik={formik}
          />
          <div className="col-span-2">
            <FormControl
              label="Birthplace"
              control="input"
              type="text"
              placeholder="City, Country"
              name="birthplace"
              formik={formik}
              errorstyles="relative text-right"
            />
          </div>
        </div>
      </Card>
      <Link
        className="self-end w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
        to="/profile/employment"
      >
        <RightArrowIcon width="100%" height="1.3em" />
      </Link>
    </div>
  )
}

export default PersonalInformation
