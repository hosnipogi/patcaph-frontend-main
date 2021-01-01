import PropTypes from "prop-types"
import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Card, CardBody } from "@windmill/react-ui"

const Articles = ({ data }) => (
  <div className="lg:flex">
    {data.articles.nodes.map(article => (
      <div key={article.childMarkdownRemark.frontmatter.slug}>
        <Link to={`/articles${article.childMarkdownRemark.frontmatter.slug}`}>
          <Card colored className="mb-4 bg-gray-100 shadow-md lg:mx-2">
            {article.childMarkdownRemark.frontmatter?.featuredImage && (
              <Img
                fluid={
                  article.childMarkdownRemark.frontmatter.featuredImage.src
                    .childImageSharp.fluid
                }
                className="object-cover"
              />
            )}
            <CardBody>
              <h6>{article.childMarkdownRemark.frontmatter.date}</h6>
              <h4 className="mb-4 tracking-normal normal-case">
                {article.childMarkdownRemark.frontmatter.title}
              </h4>
              <p>{article.childMarkdownRemark.excerpt}</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    ))}
  </div>
)

Articles.propTypes = {
  data: PropTypes.any,
}

export default Articles

export const articlesQuery = graphql`
  {
    articles: allFile(
      filter: {
        sourceInstanceName: { eq: "articles" }
        extension: { eq: "md" }
      }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              alt
              src {
                childImageSharp {
                  fluid(maxWidth: 300, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
