import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const sponsors = () => {
  const sponsors = useStaticQuery(
    graphql`
      query {
        logos: allFile(filter: { relativeDirectory: { eq: "sponsors" } }) {
          nodes {
            id
            childImageSharp {
              fixed(quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `
  )

  const { logos } = sponsors

  return (
    <div className="items-center justify-center mt-12 text-center lg:flex">
      {logos.nodes.map(({ childImageSharp, id }) => (
        <Img key={id} fixed={childImageSharp.fixed} className="mx-4" />
      ))}
    </div>
  )
}

export default sponsors
