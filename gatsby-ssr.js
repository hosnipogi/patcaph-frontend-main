/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import Layout from "./src/components/layout"
import { UserProvider } from "./src/contexts/UserContext"
import { Windmill } from "@windmill/react-ui"

export const wrapPageElement = ({ element, props }) => {
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
