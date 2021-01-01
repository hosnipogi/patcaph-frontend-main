import React, { useCallback, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { UserContext } from "../contexts/UserContext"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import FormControl from "../components/elements/forms/FormControl"
import Submit from "../components/elements/forms/Submit"
import Api from "../lib/services/api"
import { DASHBOARD, DOMAIN, LOGIN } from "../lib/config/URLs"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format ⚠️")
    .required("Please enter Email ⚠️"),
  password: Yup.string().required("Please enter password ⚠️"),
})

export default function Login() {
  const { state, dispatch } = useContext(UserContext)
  const handleSubmit = useCallback(async (values, submitProps) => {
    const api = new Api({
      url: LOGIN,
      method: "post",
      data: values,
      submitProps,
    })
    try {
      const { data } = await api.fetch()
      const { email, hasProfile } = data
      console.log(data)
      dispatch({ type: "SET_ERRORS", payload: null })
      dispatch({
        type: "SET_USER",
        payload: {
          email,
          hasProfile,
        },
      })
      dispatch({ type: "SET_LOGIN_STATUS", payload: true })
    } catch (e) {
      console.log(e)
      const { errors, message } = e
      submitProps.setErrors({
        email: errors.email,
        password: "⚠️",
      })
      dispatch({
        type: "SET_ERRORS",
        payload: { errors, message },
      })
    }
  }, [])

  useEffect(() => {
    if (state.user !== null)
      state.user.hasProfile
        ? setTimeout(
            () => window.location.replace(`${DOMAIN}/${DASHBOARD}`),
            2000
          )
        : setTimeout(() => navigate("/profile"), 4000)
    return () => {}
  }, [state.user])

  return (
    <div className="w-full pt-10 pb-64 mx-auto md:w-3/4 lg:w-2/5 lg:mx-0">
      {state.user ? (
        <p className="block w-full p-4 mb-4 text-green-700 bg-green-100 border-2 border-green-300 rounded-lg hover:border-gray-400">
          Logged in.{" "}
          {state.user.hasProfile
            ? "Redirecting to dashboard."
            : "Please complete profile"}
        </p>
      ) : (
        <>
          {" "}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {props => {
              return (
                <Form>
                  <FormControl
                    control="input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    errors={props.errors.email}
                    touched={props.touched.email}
                  />
                  <FormControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    errors={props.errors.password}
                    touched={props.touched.password}
                  />
                  <Submit
                    label="Login &rarr;"
                    disabled={!props.isValid}
                    isSubmitting={props.isSubmitting}
                  />
                </Form>
              )
            }}
          </Formik>
          <Link
            to="/"
            className="block my-3 text-sm text-left text-blue-600 hover:underline"
          >
            Forgot your password?
          </Link>
          <hr className="my-5 shadow-" />
          <p className="text-sm text-left">
            Not a PATCA member?
            <Link to="/register" className="ml-1 text-blue-600 hover:underline">
              Register Here
            </Link>
          </p>
        </>
      )}
    </div>
  )
}