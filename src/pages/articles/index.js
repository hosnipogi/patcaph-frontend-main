import PropTypes from "prop-types"
import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../../components/seo"

const Articles = ({ data }) => {
  console.log(data.articles.nodes)
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
              <div className="flex flex-col mb-4 lg:flex-row md:flex-row">
                <Img
                  fluid={
                    article.childMarkdownRemark.frontmatter.featuredImage.src
                      .childImageSharp.fluid
                  }
                  className="object-cover mb-2 lg:mb-0 md:mb-0 lg:w-4/12"
                />
                <div className="lg:px-4 md:px-4 lg:w-4/12">
                  <h6>{article.childMarkdownRemark.frontmatter.date}</h6>
                  <h6>{article.childMarkdownRemark.frontmatter.author}</h6>
                  <h4 className="mb-4 tracking-normal normal-case hover:text-blue-700">
                    {article.childMarkdownRemark.frontmatter.title}
                  </h4>
                </div>
                <div className="lg:px-4 md:px-4 lg:w-4/12">
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
