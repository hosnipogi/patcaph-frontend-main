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
import { Card } from "@windmill/react-ui"
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
  contactNumber: Yup.string().required("Required"),
  association: Yup.string().required("Required"),
})

export default function Aprm() {
  const [qr, setQr] = useState()
  const [jsonValues, setJsonValues] = useState({})

  const handleSubmit = async values => {
    const json = JSON.stringify(values)
    setQr(json)
    setJsonValues(values)
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
                    <div className="w-7/12">
                      <FormControl
                        control="input"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        formik={formik}
                      />
                    </div>
                    <div className="w-5/12">
                      <FormControl
                        control="input"
                        type="tel"
                        name="contactNumber"
                        label="Whatsapp"
                        placeholder="915 123 4567"
                        formik={formik}
                      />
                    </div>
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
            <h5 className="mb-4">See you at APRM 2022!</h5>
            <Card className="p-8 shadow-xl">
              <div className="flex flex-col items-center gap-8 md:items-start md:flex-row ">
                <div>
                  <QRCode value={qr} style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "monospace" }}>
                    <p>
                      Email:{" "}
                      <span className="font-bold">{jsonValues.email}</span>
                    </p>
                    <p>
                      Full Name:{" "}
                      <span className="font-bold">{`${jsonValues.firstname} ${jsonValues.middlename} ${jsonValues.surname}`}</span>
                    </p>
                    <p>
                      Whatsapp:{" "}
                      <span className="font-bold">
                        {jsonValues.contactNumber}
                      </span>
                    </p>
                    <p>
                      ATC Association:{" "}
                      <span className="font-bold">
                        {jsonValues.association}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium atque nihil dignissimos labore sed pariatur veniam
                  quibusdam cum delectus itaque aliquam deserunt tempore ipsum,
                  aperiam sunt adipisci alias numquam corrupti.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
