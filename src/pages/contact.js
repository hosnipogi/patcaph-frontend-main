import React, { useState } from "react"

import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormControl from "../components/elements/forms/FormControl"
import Submit from "../components/elements/forms/Submit"
import Api from "../lib/services/api"
import { CONTACT } from "../lib/config/URLs"

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

const validationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email().required(),
  subject: Yup.string(),
  message: Yup.string().required(),
})

const contactUs = () => {
  const [response, setResponse] = useState({ success: false, message: null })
  const handleSubmit = async (values, submitProps) => {
    const api = new Api({
      url: CONTACT,
      data: values,
      submitProps,
      setResponse,
      method: "post",
      messageOnSuccess: "Sent",
    })

    try {
      const { data } = await api.fetch()
      alert(JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="grid-cols-7 gap-5 lg:grid">
      <div className="col-span-4">
        {!response.success ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {props => (
              <Form>
                <FormControl
                  control="input"
                  type="text"
                  name="name"
                  label="Name"
                />
                <FormControl
                  control="input"
                  type="email"
                  name="email"
                  placeholder="*"
                  label="Email"
                  errors={props.errors.email}
                  touched={props.touched.email}
                />
                <FormControl
                  control="input"
                  type="text"
                  name="subject"
                  label="Subject"
                />
                <FormControl
                  control="textarea"
                  name="message"
                  placeholder="*"
                  label="Message"
                  errors={props.errors.message}
                  touched={props.touched.message}
                  rows="8"
                />
                <Submit
                  label="Submit"
                  disabled={!props.isValid}
                  isSubmitting={props.isSubmitting}
                />
              </Form>
            )}
          </Formik>
        ) : (
          <p>{response.message}</p>
        )}
      </div>
      <div className="flex flex-col col-span-3 text-left">
        <div className="w-full mb-2 lg:w-4/5">
          {/* <img src={Map} alt="PATCA Address" loading="lazy" /> */}
        </div>
        <h5>Philippine Air Traffic Conrollers&apos; Association</h5>
        <p>EEI Office, Civil Aviation Authority of the Philippines</p>
        <p>1300 Pasay City</p>
        <p>+63 912 456 7890</p>
        <p>contact@patca.ph</p>
      </div>
    </div>
  )
}

export default contactUs
