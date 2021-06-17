import PropTypes from "prop-types"
import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/seo"

const Articles = ({ data }) => {
  return (
    <>
      <SEO title="Articles" />
      <ul className="">
        {data.articles.nodes.map(article => (
          <li
            className="my-4"
            key={article.childMarkdownRemark.frontmatter.slug}
          >
            <Link
              to={`/articles${article.childMarkdownRemark.frontmatter.slug}`}
            >
              <div className="flex mb-4">
                <Img
                  fluid={
                    article.childMarkdownRemark.frontmatter.featuredImage.src
                      .childImageSharp.fluid
                  }
                  className="object-cover w-4/12"
                />
                <div className="w-4/12 px-4">
                  <h6>{article.childMarkdownRemark.frontmatter.date}</h6>
                  <h6>{article.childMarkdownRemark.frontmatter.author}</h6>
                  <h4 className="mb-4 tracking-normal normal-case hover:text-blue-700">
                    {article.childMarkdownRemark.frontmatter.title}
                  </h4>
                </div>
                <div className="w-4/12 px-4">
                  <p>{article.childMarkdownRemark.excerpt}</p>
                </div>
              </div>
              <hr />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

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
            author
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
