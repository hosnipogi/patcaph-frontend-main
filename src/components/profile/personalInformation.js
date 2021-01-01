import React, { useContext } from "react"
import { Link } from "gatsby"
import { FormContext } from "../../contexts/FormContext"
import FormControl from "../../components/elements/forms/FormControl"
import { RightArrowIcon } from "../icons/"
import { Card } from "@windmill/react-ui"

function PersonalInformation() {
  const { formik, stuffForChildren } = useContext(FormContext)
  const { fields } = stuffForChildren

  const { gender, civil_status } = fields

  return (
    <div className="flex flex-col text-sm">
      <Card className="grid-cols-3 gap-4 px-4 pt-4 lg:grid">
        <FormControl
          control="input"
          type="text"
          name="firstname"
          label="First name"
          placeholder="José"
          errors={formik.errors.firstname}
          touched={formik.touched.firstname}
        />
        <FormControl
          control="input"
          type="text"
          name="middlename"
          label="Middle name"
          placeholder="Protasio"
          errors={formik.errors.middlename}
          touched={formik.touched.middlename}
        />
        <FormControl
          control="input"
          type="text"
          name="surname"
          label="Surname"
          placeholder="Rizal"
          errors={formik.errors.surname}
          touched={formik.touched.surname}
        />
      </Card>
      <Card className="px-4 pt-4 my-4">
        <FormControl
          control="input"
          type="text"
          name="address"
          label="Address"
          placeholder="House number, Street [Barangay,] City, [Country]"
          errors={formik.errors.address}
          touched={formik.touched.address}
        />
        <FormControl
          control="input"
          type="tel"
          name="contactNumber"
          label="Contact Number"
          placeholder="915 123 4567"
          errors={formik.errors.contactNumber}
          touched={formik.touched.contactNumber}
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
            control="input"
            type="date"
            placeholder="YYYY-MM-DD"
            name="birthday"
            errors={formik.errors.birthday}
            touched={formik.touched.birthday}
            max="2002-12-31"
            errorstyles="relative text-right"
          />
          <div className="col-span-2">
            <FormControl
              label="Birthplace"
              control="input"
              type="text"
              placeholder="City, Country"
              name="birthplace"
              errors={formik.errors.birthplace}
              touched={formik.touched.birthplace}
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
