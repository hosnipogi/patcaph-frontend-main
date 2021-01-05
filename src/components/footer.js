import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { FaFacebookSquare, FaYoutube } from "react-icons/fa"

const Footer = ({ routes }) => {
  return (
    <footer
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(45 101 150) 39%, rgb(37, 80, 115) 96%)",
      }}
    >
      <div className="container w-11/12 py-8 mx-auto text-sm text-white ">
        <h4 className="mb-4 text-white uppercase">Links</h4>
        <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row">
          <div className="flex flex-wrap self-start mb-12 lg:mb-0 lg:w-7/12 lg:self-auto">
            {routes.map(
              route =>
                route.showInFooter && (
                  <Link
                    key={route.name}
                    to={route.path}
                    className="flex-grow-1 flex-shrink-1 hover:underline"
                    style={{ flexBasis: "50%" }}
                  >
                    {route.name}
                  </Link>
                )
            )}
          </div>
          <div className="flex lg:justify-center lg:items-center lg:w-5/12">
            <a
              href="https://www.facebook.com/PATCA1962"
              target="_blank"
              rel="noreferrer"
              className="mr-4"
            >
              <FaFacebookSquare style={{ width: "2.4rem", height: "2.4rem" }} />
            </a>
            <a
              href="https://www.youtube.com/channel/UC_1FYyteWVVNRzmYNQN2cRQ"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube style={{ width: "2.4rem", height: "2.4rem" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 text-white bg-black">
        <span>
          © {new Date().getFullYear()} Philippine Air Traffic Controllers&apos;
          Association
        </span>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  routes: PropTypes.array,
}

export default Footer
