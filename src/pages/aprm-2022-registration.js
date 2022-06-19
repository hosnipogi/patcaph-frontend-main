import React, { useState } from "react"
// import { Link } from "gatsby"
// import { UserContext } from "../contexts/UserContext"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import FormControl from "../components/elements/forms/FormControl"
import Submit from "../components/elements/forms/Submit"
// import Api from "../lib/services/api"
// import { DASHBOARD, LOGIN } from "../lib/config/URLs"
import SEO from "../components/seo"
import QRCode from "react-qr-code"

const initialValues = {
  email: "",
  firstname: "",
  middlename: "",
  surname: "",
  association: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter Email"),
  firstname: Yup.string().required("Required"),
  middlename: Yup.string(),
  surname: Yup.string().required("Required"),
  association: Yup.string(),
})

export default function Aprm() {
  const [qr, setQr] = useState()

  const handleSubmit = async values => {
    const json = JSON.stringify(values)
    setQr(json)
  }

  return (
    <>
      <SEO title="APRM 2022" />
      <div className="w-full pt-10 pb-64 mx-auto md:w-3/4 lg:w-3/5 lg:mx-0">
        {typeof qr === "undefined" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form>
                  <div className="flex flex-col md:gap-4 md:flex-row">
                    <FormControl
                      control="input"
                      type="text"
                      name="firstname"
                      label="First Name"
                      placeholder=""
                      formik={formik}
                    />
                    <FormControl
                      control="input"
                      type="text"
                      name="middlename"
                      label="Middle name"
                      placeholder=""
                      formik={formik}
                    />
                    <FormControl
                      control="input"
                      type="text"
                      name="surname"
                      label="Surname"
                      placeholder=""
                      formik={formik}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <FormControl
                      control="input"
                      type="email"
                      name="email"
                      label="Email"
                      placeholder="Email"
                      formik={formik}
                    />
                    <FormControl
                      control="input"
                      type="tel"
                      name="contactNumber"
                      label="Whatsapp Number"
                      placeholder="915 123 4567"
                      formik={formik}
                    />
                  </div>
                  <FormControl
                    control="input"
                    type="text"
                    name="association"
                    label="ATC Association"
                    placeholder=""
                    formik={formik}
                  />
                  <Submit
                    label="Register for APRM 2022 &rarr;"
                    disabled={!formik.isValid}
                    isSubmitting={formik.isSubmitting}
                  />
                </Form>
              )
            }}
          </Formik>
        ) : (
          <div>
            <h5 className="mb-4">Thank you for registering</h5>
            <QRCode value={qr} />
          </div>
        )}
      </div>
    </>
  )
}
