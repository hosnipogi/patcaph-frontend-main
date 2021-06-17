import React from "react"
import { graphql } from "gatsby"
// import { Link } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"

export const query = graphql`
  query {
    imageSharp(id: { eq: "79160747-c9ee-5794-8717-e78af44b4f97" }) {
      fluid(maxWidth: 1024, quality: 90) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const events = ({ data }) => {
  return (
    <>
      <SEO title="Events" />
      <div>
        <ul className="pl-5 my-4 list-decimal">
          <li className="">
            <div className="">
              <div className="mb-4">
                <h4>Building Psychological Resilience Webinar</h4>
                <p>June 23, 2021 1:00PM - 5:30PM</p>
              </div>
              <div>
                <p>
                  Click{" "}
                  <a
                    href="https://zoom.us/meeting/register/tJcrf-6hpz0iHNHcSX1dGDjaZO3csc2GsL58"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-800 hover:underline"
                  >
                    here
                  </a>{" "}
                  to register.
                </p>
              </div>
            </div>
            <a
              href="https://zoom.us/meeting/register/tJcrf-6hpz0iHNHcSX1dGDjaZO3csc2GsL58"
              target="_blank"
              rel="noreferrer"
            >
              <Img fluid={data.imageSharp.fluid} className="" />
            </a>
          </li>
        </ul>
        {/* <Link to="/" className="text-blue-500 hover:underline">
          &larr; Come back later
        </Link> */}
      </div>
    </>
  )
}

export default events
