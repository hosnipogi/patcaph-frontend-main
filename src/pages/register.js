import React, { useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { Formik, Form } from "formik"
import FormControl from "../components/elements/forms/FormControl"
import Submit from "../components/elements/forms/Submit"
import * as Yup from "yup"
import Api from "../lib/services/api"
import { REGISTER } from "../lib/config/URLs"
import SEO from "../components/seo"

import { UserContext } from "../contexts/UserContext"

const initialValues = {
  email: "",
  password: "",
  password_confirmation: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter Email"),
  password: Yup.string().required("Please enter password").min(6),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords do not match")
    .required("Please confirm password"),
})

const Register = () => {
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    state.user && setTimeout(() => navigate("/profile"), 3000)
  }, [state.user])

  const handleSubmit = async (values, submitProps) => {
    const api = new Api({
      url: REGISTER,
      method: "post",
      data: values,
      submitProps,
    })
    try {
      const { data } = await api.fetch()
      dispatch({ type: "SET_ERRORS", payload: null })
      dispatch({
        type: "SET_USER",
        payload: { email: data, hasProfile: false },
      })
      dispatch({ type: "SET_LOGIN_STATUS", payload: true })
    } catch (e) {
      api.abort()
      const { errors, message } = e
      submitProps.setErrors({
        email: errors.email,
      })
      dispatch({
        type: "SET_ERRORS",
        payload: { errors, message },
      })
    }
  }

  return (
    <>
      <SEO title="Register" />
      <div className="w-full pt-10 pb-64 mx-auto md:w-3/4 lg:w-2/5 lg:mx-0">
        {!state.user ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form>
                  <FormControl
                    control="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    formik={formik}
                  />
                  <FormControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    formik={formik}
                  />
                  <FormControl
                    control="input"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    formik={formik}
                  />
                  <p className="mt-8 mb-4 text-sm">
                    By clicking Register, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      Terms and Conditions
                    </a>
                  </p>
                  <Submit
                    label="Register"
                    // disabled={!formik.isValid}
                    disabled={true}
                    isSubmitting={formik.isSubmitting}
                  />
                </Form>
              )
            }}
          </Formik>
        ) : (
          <p className="block w-full p-4 mb-4 text-green-500 bg-green-100 border-2 border-green-300 rounded-lg hover:border-gray-400">
            Please complete membership registration in the next step.
          </p>
        )}
        <hr className="my-5" />
        <p className="text-sm text-left">
          Already a PATCA member?
          <Link to="/login" className="ml-1 text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  )
}

export default Register
