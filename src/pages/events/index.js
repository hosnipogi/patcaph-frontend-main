import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/seo"

const events = ({ data }) => {
  const events = data.allFile.edges
  const dateToday = new Date().getTime()

  const upcomingEvents = []
  const pastEvents = []

  events.forEach(({ node }) => {
    const event_date = node.childMarkdownRemark.frontmatter.date
    const eventDate = new Date(event_date).getTime()
    if (eventDate > dateToday) {
      upcomingEvents.push(node)
    } else {
      pastEvents.push(node)
    }
  })

  return (
    <>
      <div className="mb-4">
        <h3>Upcoming</h3>
        <Posts events={upcomingEvents} />
      </div>
      <div>
        <h3>Past Events</h3>
        <Posts events={pastEvents} />
      </div>
    </>
  )
}

const Posts = ({ events }) => (
  <>
    <SEO title="Events" />
    <div>
      <ul className="pl-5 my-4 list-decimal">
        {events.map(({ childMarkdownRemark: { frontmatter, html } }) => (
          <li key={frontmatter.title} className="mb-4">
            <div className="mb-4">
              <h4>{frontmatter.title}</h4>
              <p>
                {new Date(frontmatter.date).toDateString()}
                {frontmatter.time && ", "}
                {frontmatter.time}
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
                  fluid={frontmatter.featuredImage.src.childImageSharp.fluid}
                  className=""
                />
              </a>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  </>
)

export default events

export const eventsQuery = graphql`
  {
    allFile(
      filter: { sourceInstanceName: { eq: "events" }, ext: { eq: ".md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              date
              time
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

Posts.propTypes = {
  events: PropTypes.array,
}
