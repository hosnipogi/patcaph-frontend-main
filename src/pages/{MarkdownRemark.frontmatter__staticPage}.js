import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import Sponsors from "../components/sponsors"
import SEO from "../components/seo"
import capitalizeFirstLetter from "../lib/utils/capitalizeFirstLetter"

import "../styles/md.css"

const AboutMeta =
  "Filipino Air Traffic Controllers at your service in keeping the Phillippine Skies Safe."

const StaticPages = ({ data }) => {
  const { markdownRemark } = data
  const {
    html,
    frontmatter: { staticPage },
  } = markdownRemark

  return (
    <>
      <SEO
        title={capitalizeFirstLetter(staticPage)}
        description={staticPage === "about" ? AboutMeta : ""}
      />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {staticPage === "about" && <Sponsors />}
    </>
  )
}

StaticPages.propTypes = {
  data: PropTypes.any,
}

export default StaticPages

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
