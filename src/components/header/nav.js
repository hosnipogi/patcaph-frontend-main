import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import { UserContext } from "../../contexts/UserContext"
import Api from "../../lib/services/api"
import { LOGOUT } from "../../lib/config/URLs"
import { Nav as NavWrapper } from "./elements"
import Logo from "../logo"
import { Transition, Backdrop } from "@windmill/react-ui"
import { DASHBOARD } from "../../lib/config/URLs"
//icons

import { MenuIcon } from "../icons"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { IoIosAirplane } from "react-icons/io"
import { RiArticleLine } from "react-icons/ri"
import { GrGallery } from "react-icons/gr"
import { FaRegCalendarAlt } from "react-icons/fa"
import { FaPhone } from "react-icons/fa"
import { VscOrganization } from "react-icons/vsc"

const generateIcon = route => {
  switch (route) {
    case "/articles":
      return (
        <RiArticleLine className="nav__main__desktop__routes__links__icon" />
      )
    case "/gallery":
      return <GrGallery className="nav__main__desktop__routes__links__icon" />
    case "/events":
      return (
        <FaRegCalendarAlt className="nav__main__desktop__routes__links__icon" />
      )
    case "/about":
      return (
        <VscOrganization className="nav__main__desktop__routes__links__icon" />
      )
    case "/contact":
      return <FaPhone className="nav__main__desktop__routes__links__icon" />
    default:
      return
  }
}

const Nav = ({ path, routes }) => {
  const { state, dispatch } = useContext(UserContext)
  const { user } = state

  const [isDrawerOpen, setDrawerIsOpen] = useState(false)
  const toggleDrawerState = () => setDrawerIsOpen(!isDrawerOpen)
  const closeDrawer = () => setDrawerIsOpen(false)

  React.useEffect(() => closeDrawer(), [path])

  return (
    <>
      <Transition
        show={isDrawerOpen}
        enter="transition ease-in-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Backdrop onClick={closeDrawer} />
      </Transition>

      <NavWrapper path={path} showDrawer={isDrawerOpen}>
        <nav className="nav__main">
          <div className="nav__main__mobile">
            <Link to="/" className="nav__main__mobile__link">
              <Logo width="100%" className="nav__main__mobile__link__logo" />
            </Link>
            <button
              type="button"
              className="nav__main__mobile__button"
              onClick={toggleDrawerState}
            >
              <MenuIcon className="nav__main__mobile__button__menu" />
            </button>
          </div>
          <div className="nav__main__desktop">
            <div className="nav__main__desktop__routes">
              <Link className="nav__main__desktop__routes__links" to="/">
                <Logo />
              </Link>
              {routes.map(
                route =>
                  route.showInHeader &&
                  (route.isExternalLink ? (
                    <a
                      className="nav__main__desktop__routes__links"
                      key={route.name}
                      href={route.path}
                    >
                      {route.name}
                    </a>
                  ) : (
                    <Link
                      className="nav__main__desktop__routes__links"
                      key={route.name}
                      to={route.path}
                    >
                      <div className="">
                        {generateIcon(route.path)}
                        <span>{route.name}</span>
                        {route.subroutes && (
                          <div className="nav__main__desktop__routes__subroutes">
                            {route.subroutes.map(subroute => (
                              <Link key={subroute.path}>{subroute.name}</Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))
              )}
            </div>
            <hr />
            <div className="nav__main__desktop__user">
              {user ? (
                <>
                  <span className="nav__main__desktop__user__email">
                    {user.email}
                  </span>
                  <div className="nav__main__desktop__user__submenu">
                    {user.hasProfile ? (
                      <a
                        className="nav__main__desktop__user__submenu__link"
                        href={DASHBOARD}
                      >
                        <FiLogIn className="nav__main__desktop__user__submenu__link__icon" />
                        <span className="nav__main__desktop__user__submenu__link__text">
                          Dashboard
                        </span>
                      </a>
                    ) : (
                      <Link
                        className="nav__main__desktop__user__submenu__link"
                        to="/profile"
                      >
                        <FiLogIn className="nav__main__desktop__user__submenu__link__icon" />
                        <span className="nav__main__desktop__user__submenu__link__text">
                          Profile
                        </span>
                      </Link>
                    )}
                    <a
                      className="nav__main__desktop__user__submenu__link"
                      onClick={e => {
                        e.preventDefault()
                        console.log(e)
                        new Api({
                          url: LOGOUT,
                          method: "post",
                        })
                          .fetch()
                          .then(() => {
                            dispatch({
                              type: "SET_USER",
                              payload: null,
                            })
                            dispatch({
                              type: "SET_LOGIN_STATUS",
                              payload: false,
                            })
                            setTimeout(() => navigate("/"), 1000)
                          })
                          .catch(console.log)
                      }}
                    >
                      <FiLogOut className="nav__main__desktop__user__submenu__link__icon" />
                      <span className="nav__main__desktop__user__submenu__link__text">
                        Logout
                      </span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <span className="nav__main__desktop__user__email">
                    ATC PORTAL{" "}
                    <span role="img" className="ml-1" aria-label="Philippines">
                      🇵🇭
                    </span>{" "}
                  </span>

                  <div className="nav__main__desktop__user__submenu">
                    <Link
                      className="nav__main__desktop__user__submenu__link"
                      to="/login"
                    >
                      <FiLogIn className="nav__main__desktop__user__submenu__link__icon" />
                      <span className="nav__main__desktop__user__submenu__link__text">
                        Login
                      </span>
                    </Link>
                    <Link
                      className="nav__main__desktop__user__submenu__link"
                      to="/register"
                    >
                      <IoIosAirplane className="nav__main__desktop__user__submenu__link__icon" />
                      <span className="nav__main__desktop__user__submenu__link__text">
                        Register
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </NavWrapper>
    </>
  )
}

Nav.propTypes = {
  path: PropTypes.string,
  routes: PropTypes.array,
}

Nav.defaultProps = {
  path: "",
}

export default Nav
