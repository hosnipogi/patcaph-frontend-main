import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/seo"

const events = ({ data }) => {
  const events = data.allFile.edges
  return (
    <>
      <SEO title="Events" />
      <div>
        <ul className="pl-5 my-4 list-decimal">
          {events.map(
            ({
              node: {
                childMarkdownRemark: { frontmatter, html },
              },
            }) => (
              <li key={frontmatter.title} className="mb-4">
                <div className="mb-4">
                  <h4>{frontmatter.title}</h4>
                  <p>
                    {new Date(frontmatter.event_date).toDateString()}
                    {", "}
                    {frontmatter.event_time}
                  </p>
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  <a
                    href={frontmatter.external_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Img
                      fluid={
                        frontmatter.featuredImage.src.childImageSharp.fluid
                      }
                      className=""
                    />
                  </a>
                </div>
                <hr />
              </li>
            )
          )}
        </ul>
      </div>
    </>
  )
}

export default events

export const eventsQuery = graphql`
  {
    allFile(
      filter: { sourceInstanceName: { eq: "events" }, ext: { eq: ".md" } }
      sort: {
        fields: childMarkdownRemark___frontmatter___event_date
        order: DESC
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              event_date
              event_time
              external_url
              slug
              featuredImage {
                src {
                  childImageSharp {
                    fluid(maxWidth: 1024, quality: 90) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              title
            }
            html
          }
        }
      }
    }
  }
`
