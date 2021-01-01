import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import Sponsors from "../components/sponsors"

import "../styles/md.css"

const About = ({ data }) => {
  const { markdownRemark } = data
  const {
    html,
    frontmatter: { staticPage },
  } = markdownRemark

  return (
    <>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {staticPage === "about" && <Sponsors />}
    </>
  )
}

About.propTypes = {
  data: PropTypes.any,
}

export default About

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        staticPage
      }
    }
  }
`
