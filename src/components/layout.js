import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          routes {
            name
            path
            showInHeader
            showInFooter
          }
        }
      }
    }
  `)

  const routes = data.site.siteMetadata.routes

  const { pathname } = location
  const [path] = pathname?.match(/^\/[a-zA-Z0-9]*/g) || []

  return (
    <>
      <Header location={pathname} routes={routes} />
      <main className={path != "/" ? "lg:bg-gray-50 lg:pb-12" : undefined}>
        {path !== "/" && !pathname?.match(/\/blogs\/[a-zA-Z0-9]+/g)?.length ? (
          <div
            className={`container w-11/12 ${
              path !== "/" ? "lg:px-4 py-4" : "py-4"
            } mx-auto lg:pt-12 lg:pb-20`}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      <Footer routes={routes} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
