import React, { useCallback, useContext, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { FormContext } from "../../contexts/FormContext"
import { FieldArray } from "formik"
import FormControl from "../elements/forms/FormControl"
import { LeftArrowIcon, RightArrowIcon } from "../icons"
import { Card } from "@windmill/react-ui"
import filterInput from "../../lib/utils/filterInput"

function EmploymentInformation() {
  const licenseInput = useRef(null)
  const wiresignInput = useRef(null)

  useEffect(() => {
    filterInput(licenseInput.current, value => /^\d*$/.test(value))
    filterInput(wiresignInput.current, value => /^[A-Za-z]*$/.test(value))
  }, [])

  const { formik, stuffForChildren } = useContext(FormContext)
  const { fields } = stuffForChildren

  const { facilities, designation, batch } = fields

  // Render Area in facility select option

  const renderAreaOptions = useCallback(index => {
    const hasValue = facilities.find(fac => fac.facility === index)
    return hasValue?.area ? hasValue.area : [""]
  }, [])

  return (
    <div className="flex-col">
      <Card className="pt-4 mb-4 overflow-visible lg:border lg:px-4">
        <div className="grid-cols-3 gap-4 mb-4 lg:grid">
          <FormControl
            control="select"
            label="Training Batch"
            name="batch"
            options={batch}
            formik={formik}
          />
          <FormControl
            control="input"
            formik={formik}
            name="wiresign"
            type="text"
            placeholder="(Initials, example: AB)"
            label="Wiresign"
            maxLength="2"
            innerRef={wiresignInput}
          />
          <FormControl
            label="Date Employed"
            control="date"
            name="dateEmployed"
            maxDate={new Date()}
            formik={formik}
          />
        </div>
        <div className="grid-cols-3 gap-4 lg:grid">
          <div className="relative flex flex-col justify-center">
            <h6 className="mb-1">License Number</h6>
            <div className="flex flex-row items-center w-full mb-4">
              <span
                className={`block border p-4 border-gray-300 border-r-0 bg-gray-200 text-gray-600 rounded-l-lg ${
                  formik.errors.licenseNumber && formik.touched.licenseNumber
                    ? "border-red-200"
                    : !formik.errors.licenseNumber &&
                      formik.touched.licenseNumber
                    ? "border-green-300"
                    : ""
                }`}
              >
                ATC
              </span>
              <FormControl
                control="input"
                formik={formik}
                inputMode="numeric"
                type="text"
                name="licenseNumber"
                placeholder="Numerical 6 digits"
                styles="rounded-lg border-l-0 rounded-l-none"
                style={{ marginBottom: "0px" }}
                maxLength="6"
                innerRef={licenseInput}
              />
            </div>
          </div>
          <FormControl
            label="ATC License Expiry"
            control="date"
            name="ATCLicenseExpiry"
            minDate={new Date()}
            formik={formik}
          />
          <FormControl
            label="Medical License Expiry"
            control="date"
            name="medicalLicenseExpiry"
            minDate={new Date()}
            formik={formik}
          />
        </div>
      </Card>

      <Card className="pt-4 mb-4 overflow-visible lg:border lg:px-4">
        <h6 className="mb-2">
          Facility Assignment History
        </h6>

        <FieldArray name="facility">
          {({ form, push, remove }) => {
            const { values, errors, touched } = form
            const { facility } = values
            const facilitiesArray = facility
            return (
              <>
                <div
                  className={`lg:grid ${
                    facilitiesArray.length > 1 ? "grid-cols-6" : "grid-cols-5"
                  } gap-4 mt-4 hidden`}
                >
                  {facilitiesArray.length > 1 && <p> </p>}
                  <h6>Facility</h6>
                  <h6>Area</h6>
                  <h6>From</h6>
                  <h6>
                    To{" "}
                    <small>
                      (Select{" "}
                      <i>
                        <strong>date today</strong>
                      </i>{" "}
                      if current)
                    </small>
                  </h6>
                  <h6>Designation</h6>
                </div>
                {facilitiesArray.map(({ facility, to, from }, index) => {
                  window.from = from
                  window.to = to
                  return (
                    <Card
                      colored={errors.facility && true}
                      className={`lg:grid grid-cols-12 pt-2 px-2 mb-4 flex flex-col w-full overflow-visible ${
                        errors.facility
                          ? "bg-red-100 border-red-300"
                          : "bg-gray-200 border-gray-300"
                      }`}
                      key={index}
                    >
                      {facilitiesArray.length > 1 && (
                        <div className="flex items-center justify-center order-2 col-span-1 mb-2 lg-order-1">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="w-full p-4 text-white bg-red-500 rounded-lg lg:w-1/2 lg:p-0 lg:h-10 hover:bg-red-700"
                          >
                            x
                          </button>
                        </div>
                      )}
                      <div
                        className={`lg:grid grid-cols-5 gap-4 text-sm order-1 lg:order-2 ${
                          facilitiesArray.length > 1
                            ? "col-span-11"
                            : "col-span-12"
                        }`}
                      >
                        <div className="mb-4 lg:mb-0">
                          <h6 className="mb-1 ml-2 lg:hidden">Facility</h6>
                          <FormControl
                            key={index}
                            control="select"
                            name={`facility[${index}].facility`}
                            options={(() =>
                              facilities.map(({ facility }) => facility))()}
                            onChange={e => {
                              form.handleChange(e)
                              try {
                                form.setFieldValue(
                                  `facility[${index}].area`,
                                  renderAreaOptions(e.target.value)[0]
                                )
                              } catch {
                                console.log("Error getting areas")
                              }
                            }}
                            formik={form}
                            styles="sm:text-sm sm:mb-0"
                          />
                        </div>

                        <div className="mb-4 lg:mb-0">
                          <h6 className="mb-1 ml-2 lg:hidden">Area</h6>
                          <FormControl
                            options={renderAreaOptions(facility)} // facility map param {facility} only used here
                            control="select"
                            name={`facility[${index}].area`}
                            formik={form}
                            styles="sm:text-sm sm:mb-0"
                          />
                        </div>

                        <div className="mb-4 lg:mb-0">
                          <h6 className="mb-1 ml-2 lg:hidden">From</h6>
                          <FormControl
                            control="date"
                            name={`facility[${index}].from`}
                            maxDate={new Date()}
                            formik={form}
                            selected={from}
                          />
                        </div>

                        <div className="mb-4 lg:mb-0">
                          <h6 className="mb-1 ml-2 lg:hidden">
                            To{" "}
                            <small>
                              (Select{" "}
                              <i>
                                <strong>date today</strong>
                              </i>{" "}
                              if current)
                            </small>
                          </h6>
                          <FormControl
                            control="date"
                            name={`facility[${index}].to`}
                            maxDate={new Date()}
                            formik={form}
                            selected={to}
                          />
                        </div>

                        <div className="mb-4 lg:mb-0">
                          <h6 className="mb-1 ml-2 lg:hidden">Designation</h6>
                          <FormControl
                            control="select"
                            name={`facility[${index}].designation`}
                            options={designation}
                            formik={form}
                            styles="sm:text-sm sm:mb-0"
                          />
                        </div>
                      </div>
                    </Card>
                  )
                })}
                {!errors.facility && touched.facility && (
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        facility: "",
                        area: "",
                        from: "",
                        to: "",
                        designation: "",
                      })
                    }
                    data-testid="profile__employment__button__addmore"
                    className="px-4 py-2 mb-2 text-sm text-white bg-blue-500 rounded-md"
                  >
                    Add More
                  </button>
                )}
              </>
            )
          }}
        </FieldArray>
      </Card>

      <div className="flex flex-row justify-between">
        <Link
          to="/profile/personal"
          className="w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
        >
          <LeftArrowIcon width="100%" height="1.3em" />
        </Link>
        <Link
          to="/profile/photo"
          className="w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
          data-testid="profile__employment__button__next"
        >
          <RightArrowIcon width="100%" height="1.3em" />
        </Link>
      </div>
    </div>
  )
}

export default EmploymentInformation
