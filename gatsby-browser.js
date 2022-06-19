/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
// import React from "react"
// import Layout from "./src/components/layout"
import React from "react"
import Layout from "./src/components/layout"

window.axios = require("axios")
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
window.axios.defaults.withCredentials = true
window.axios.get(SANCTUM).catch(console.log)

import { UserProvider } from "./src/contexts/UserContext"

import { SANCTUM } from "./src/lib/config/URLs"
import { Windmill } from "@windmill/react-ui"
import "./src/styles/main.css"

export const wrapPageElement = ({ element, props }) => {
  console.log({ props })
  if (element.key !== "/404.html") {
    return <Layout {...props}>{element}</Layout>
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <Windmill>{element}</Windmill>
    </UserProvider>
  )
}
