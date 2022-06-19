import React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"
import { Banner } from "./elements"

const Header = ({ location, routes }) => {
  const [path] = location.match(/^\/[a-zA-Z-0-9]*/) || [""]
  const [title] = routes.filter(route => route.path === path)
  console.log({ location, path, title })

  return (
    <>
      <Nav path={path} routes={routes} />
      {path !== "/" && !location.match(/\/blogs\/[a-zA-Z0-9]+/g)?.length && (
        <Banner>
          <div>
            <h2 className="lg:pl-4">{title?.name}</h2>
          </div>
        </Banner>
      )}
    </>
  )
}

Header.propTypes = {
  location: PropTypes.any,
  routes: PropTypes.any,
}

Header.defaultProps = {
  location: ``,
}

export default Header
