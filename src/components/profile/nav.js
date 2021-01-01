import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import { FormContext } from "../../contexts/FormContext"
import tw, { styled } from "twin.macro"
import { Card } from "@windmill/react-ui"

const NavMenu = styled.nav`
  ${tw`flex items-center text-xs`}
  a {
    ${tw`focus:outline-none`}
    > div {
      ${tw`flex items-center justify-between mx-3 md:mx-0`}
      &:first-of-type {
        margin-left: 0;
      }
      > span {
        &:first-of-type {
          ${tw`flex items-center justify-center w-10 h-10 font-bold text-white rounded-md`};
          &.active {
            ${tw`bg-blue-600`}
            &+span {
              ${tw`block`}
            }
          }
        }
        &:last-child {
          ${tw`hidden ml-2 text-left md:block`}
        }
      }
      &:hover {
        span {
          &:first-of-type {
            ${tw`bg-blue-700`};
          }
        }
      }
    }
  }
  hr {
    ${tw`hidden w-1/3 mx-6 md:block`}
  }
`

const Nav = () => {
  const location = useLocation()

  const { formik } = useContext(FormContext)
  const { errors, touched } = formik
  const { pathname } = location
  const path = pathname.replace("/profile/", "")

  return (
    <Card className="p-4 mb-6">
      <NavMenu>
        <Link to="/profile/personal">
          <div>
            <span
              className={`${
                (errors.firstname && touched.firstname) ||
                (errors.middlename && touched.middlename) ||
                (errors.surname && touched.surname) ||
                (errors.address && touched.address) ||
                (errors.contactNumber && touched.contactNumber) ||
                (errors.birthday && touched.birthday) ||
                (errors.birthplace && touched.birthplace) ||
                (errors.gender && touched.gender) ||
                (errors.civilStatus && touched.civilStatus)
                  ? "bg-red-500"
                  : "bg-gray-400"
              } ${path === "personal" && "active"}`}
            >
              1
            </span>
            <span>Personal Information</span>
          </div>
        </Link>
        <hr />
        <Link to="/profile/employment">
          <div>
            <span
              className={`${
                (errors.wiresign && touched.wiresign) ||
                (errors.dateEmployed && touched.dateEmployed) ||
                (errors.licenseNumber && touched.licenseNumber) ||
                (errors.ATCLicenseExpiry && touched.ATCLicenseExpiry) ||
                (errors.medicalLicenseExpiry && touched.medicalLicenseExpiry) ||
                (errors.facility && touched.facility) ||
                (errors.batch && touched.batch)
                  ? "bg-red-500"
                  : "bg-gray-400"
              } ${path === "employment" && "active"}`}
            >
              2
            </span>
            <span>Employment Information</span>
          </div>
        </Link>
        <hr />
        <Link to="/profile/photo">
          <div>
            <span
              className={`${
                errors.photo && touched.photo ? "bg-red-500" : "bg-gray-400"
              } ${path === "photo" && "active"}`}
            >
              3
            </span>
            <span>Upload Photo</span>
          </div>
        </Link>
        <hr />
        <Link to="/profile/review">
          <div>
            <span className={`bg-gray-400 ${path === "review" && "active"}`}>
              4
            </span>
            <span>Review & Submit</span>
          </div>
        </Link>
      </NavMenu>
    </Card>
  )
}

Nav.propTypes = {
  location: PropTypes.any,
}

export default Nav
