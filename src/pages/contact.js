import React, { useContext, useState } from "react"

import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormControl from "../components/elements/forms/FormControl"
import Submit from "../components/elements/forms/Submit"
import Api from "../lib/services/api"
import { CONTACT } from "../lib/config/URLs"
import SEO from "../components/seo"
import { UserContext } from "../contexts/UserContext"

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
  const { state } = useContext(UserContext)
  const { user } = state
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
      alert(JSON.stringify(e.message))
      console.log(e)
    }
  }
  return (
    <>
      <SEO title="Contact Us" />
      <div className="grid-cols-7 gap-5 lg:grid">
        <div className="col-span-4">
          {!response.success ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {formik => {
                if (user?.email && !formik.values.email)
                  formik.setFieldValue("email", user.email)
                return (
                  <Form>
                    {!user?.hasProfile && (
                      <FormControl
                        control="input"
                        type="text"
                        name="name"
                        label="Name"
                        formik={formik}
                      />
                    )}
                    <FormControl
                      control="input"
                      type="email"
                      name="email"
                      placeholder={user?.email ? user.email : "*"}
                      label="Email"
                      disabled={user?.email}
                      formik={formik}
                      styles={user?.email ? "text-gray-500" : ""}
                    />
                    <FormControl
                      control="input"
                      type="text"
                      name="subject"
                      label="Subject"
                      formik={formik}
                    />
                    <FormControl
                      control="textarea"
                      name="message"
                      placeholder="*"
                      label="Message"
                      formik={formik}
                      rows="8"
                    />
                    <Submit
                      label="Submit"
                      disabled={!formik.isValid}
                      isSubmitting={formik.isSubmitting}
                    />
                  </Form>
                )
              }}
            </Formik>
          ) : (
            <p>{response.message}</p>
          )}
        </div>
        <div className="flex flex-col col-span-3 text-left">
          <div className="w-full mb-2 lg:w-4/5"></div>
          <h5>Philippine Air Traffic Conrollers&apos; Association</h5>
          <p>EEI Office, Civil Aviation Authority of the Philippines</p>
          <p>1300 Pasay City</p>
          <p>+63 912 456 7890</p>
          <p>ph.patca1962@gmail.com</p>
        </div>
      </div>
    </>
  )
}

export default contactUs
