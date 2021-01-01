/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
// import React from "react"
// import Layout from "./src/components/layout"
import React from "react"
import Layout from "./src/components/layout"
import { UserProvider } from "./src/contexts/UserContext"

import { DOMAIN } from "./src/lib/config/URLs"
import { Windmill } from "@windmill/react-ui"
import "./src/styles/main.css"

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <Windmill>{element}</Windmill>
    </UserProvider>
  )
}

window.axios = require("axios")

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = DOMAIN
window.axios.get("/sanctum/csrf-cookie").catch(console.log)
