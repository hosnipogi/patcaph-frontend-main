import PropTypes from "prop-types"
import React, { useContext } from "react"
import { Link } from "gatsby"
import { FormContext } from "../../contexts/FormContext"
import Submit from "../elements/forms/Submit"
import { LeftArrowIcon } from "../icons"
import {
  Card,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@windmill/react-ui"

const CustomCard = ({ children }) => (
  <Card className="p-4 mb-4 border">{children}</Card>
)

CustomCard.propTypes = {
  children: PropTypes.any,
}

const Review = () => {
  const { formik } = useContext(FormContext)
  const { values, dirty, isValid, isSubmitting, errors } = formik
  const { facility } = values

  return (
    <div className="flex-col">
      <div className="block w-full">
        <div className="mt-4 mb-8">
          {!dirty && <h5 className="text-red-500">Please complete form</h5>}
          {dirty && isValid ? (
            <>
              <h4 className="mb-2">Personal Information</h4>
              <CustomCard>
                <div>
                  <h6>Name</h6>
                  <CustomCard>{`${values.firstname} ${values.middlename} ${values.surname}`}</CustomCard>
                </div>
                <div>
                  <h6>Address</h6>
                  <CustomCard>{values.address}</CustomCard>
                </div>
                <div>
                  <h6>Contact Number</h6>
                  <CustomCard>{values.contactNumber}</CustomCard>
                </div>
                <div className="grid-cols-2 gap-4 lg:grid">
                  <div>
                    <h6>Gender</h6>
                    <CustomCard>{values.gender}</CustomCard>
                  </div>
                  <div>
                    <h6>Civil Status</h6>
                    <CustomCard>{values.civilStatus}</CustomCard>
                  </div>
                </div>
                <div className="grid-cols-2 gap-4 lg:grid">
                  <div>
                    <h6>Birthday</h6>
                    <CustomCard>
                      {values.birthday}
                    </CustomCard>
                  </div>
                  <div>
                    <h6>Birthplace</h6>
                    <CustomCard>{values.birthplace}</CustomCard>
                  </div>
                </div>
              </CustomCard>
              <h4 className="mb-2">Employment Information</h4>
              <CustomCard>
                <div className="grid-cols-3 gap-4 lg:grid">
                  <div>
                    <h6>Wiresign</h6>
                    <CustomCard>{values.wiresign}</CustomCard>
                  </div>
                  <div>
                    <h6>Batch</h6>
                    <CustomCard>{values.batch}</CustomCard>
                  </div>
                  <div>
                    <h6>Date Employed</h6>
                    <CustomCard>
                      {values.dateEmployed}
                    </CustomCard>
                  </div>
                </div>
                <div className="grid-cols-3 gap-4 lg:grid">
                  <div>
                    <h6>License Number</h6>
                    <CustomCard>{values.licenseNumber}</CustomCard>
                  </div>
                  <div>
                    <h6>ATC License Expiry</h6>
                    <CustomCard>
                      {values.ATCLicenseExpiry}
                    </CustomCard>
                  </div>
                  <div>
                    <h6>Medical License Expiry</h6>
                    <CustomCard>
                      {" "}
                      {values.medicalLicenseExpiry}
                    </CustomCard>
                  </div>
                </div>
              </CustomCard>
              <h4 className="mb-2">Facility History</h4>
              <CustomCard>
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Facility</TableCell>
                        <TableCell>Area</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Designation</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {facility.map((fac, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{fac.facility}</TableCell>
                            <TableCell>{fac.area}</TableCell>
                            <TableCell>
                              {fac.from}
                            </TableCell>
                            <TableCell>
                              {fac.to}
                            </TableCell>
                            <TableCell>{fac.designation}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CustomCard>
            </>
          ) : dirty ? (
            <div>
              <h5 className="mb-4 text-red-500">Please complete fields:</h5>
              <ul>
                {Object.keys(errors).map(err => (
                  <li key={err} style={{ textTransform: "uppercase" }}>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <Link
          to="/profile/photo"
          className="block w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
        >
          <LeftArrowIcon width="100%" height="1.3em" />
        </Link>
        <hr className="my-8" />
        <p className="my-4 text-sm">
          Review{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Data Privacy Policy
          </a>
        </p>
        <Submit
          label="Submit"
          disabled={!isValid || !dirty}
          isSubmitting={isSubmitting}
          styles="sm:mb-0 sm:w-1/2"
        />
      </div>
    </div>
  )
}

export default Review
