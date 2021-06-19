import React, { useRef, useState, useEffect, useContext } from "react"
import { navigate, Router } from "@reach/router"

import { Formik, Form } from "formik"
import {
  initialValues,
  validationSchema,
} from "../components/formFields/formik-registration"

import Api from "../lib/services/api"
import useAxios from "../lib/hooks/useAxios"
import {
  AUTH_USER_MAIN_STORE_PROFILE,
  // DASHBOARD,
  PROFILE_FIELDS,
} from "../lib/config/URLs"
import Loading from "../components/loading"

import Nav from "../components/profile/nav"
import PersonalInformation from "../components/profile/personalInformation"
import EmploymentInformation from "../components/profile/employmentInformation"
import PhotoUpload from "../components/profile/photoUpload"
import Review from "../components/profile/review"

import { UserContext } from "../contexts/UserContext"
import { FormProvider } from "../contexts/FormContext"

import { Badge } from "@windmill/react-ui"

export default function () {
  const { state } = useContext(UserContext)

  // Prevent un-authenticated user and authenticated user who has already completed profile to access this page

  useEffect(() => {
    !state.user && navigate("/login")
    state.user?.hasProfile && navigate("/login")
  }, [])

  const title = useRef(null)

  // get Fields for select options

  const [fields, setFields] = useState(null)
  const [photo, setPhoto] = useState(null)
  const fieldsData = useAxios(PROFILE_FIELDS)

  useEffect(() => {
    fieldsData !== null && state.user && setFields(fieldsData.data)
  }, [fieldsData, state.user])

  useEffect(() => {
    fields !== null && setTimeout(() => navigate(`profile/personal`), 100)
  }, [fields])

  // formik provider values

  const stuffForChildren = {
    fields,
    photo,
    setPhoto,
  }

  useEffect(() => {
    title.current.scrollIntoView()
  }, [])

  // handle Formik submit
  const [response, setResponse] = useState({ success: false })
  console.log(response)
  const handleSubmit = async (values, submitProps) => {
    const api = new Api({
      url: AUTH_USER_MAIN_STORE_PROFILE,
      method: "post",
      data: values,
      submitProps,
      setResponse,
      messageOnSuccess: "Success, redirecting to dashboard",
    })

    try {
      await api.fetch()
      // setTimeout(() => (window.location.href = DASHBOARD), 3000)
    } catch (e) {
      api.abort()
      console.log(e)
      alert(JSON.stringify(e))
    }
  }

  return (
    <>
      <div className="mb-8">
        <h6 ref={title}>
          Email:{" "}
          <Badge className="font-bold" type="warning">
            {state.user?.email}
          </Badge>
        </h6>
      </div>

      {fields !== null ? (
        // !response.success ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <FormProvider value={{ formik, stuffForChildren }}>
              <Nav />
              <Form>
                <Router basepath="/profile">
                  <PersonalInformation path="/personal" />
                  <EmploymentInformation path="/employment" />
                  <PhotoUpload path="/photo" />
                  <Review path="/review" />
                </Router>
              </Form>
            </FormProvider>
          )}
        </Formik>
      ) : (
        // ) : (
        //   <div>{response.message}</div>
        // )
        <Loading />
      )}
    </>
  )
}
