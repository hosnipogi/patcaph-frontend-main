import PropTypes from "prop-types"
import React from "react"
import { graphql, Link } from "gatsby"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import { HOME_URL } from "../../lib/config/URLs"
import BackgroundImage from "gatsby-background-image"
import "../../styles/md.css"
import SEO from "../../components/seo"

export default function ArticleTemplate({ data }) {
  const { article, articles } = data
  const { frontmatter, html, excerpt } = article

  return (
    <>
      <SEO title={frontmatter.title} description={excerpt} />
      <div className="container w-11/12 py-4 mx-auto lg:py-8">
        {frontmatter.featuredImage && (
          <BackgroundImage
            Tag="section"
            className="py-40 mt-12 mb-10 lg:mt-0"
            fluid={frontmatter.featuredImage.src.childImageSharp.fluid}
          />
        )}

        <div className="grid-cols-12 gap-4 lg:grid">
          <div className="col-span-9">
            <div className="mb-8">
              <Link
                to="/articles"
                className="font-semibold text-blue-500 hover:underline "
              >
                &larr; Back
              </Link>
            </div>
            <section className="mb-4">
              <h4 className="font-medium capitalize font-harriet">
                {frontmatter.author}
              </h4>
              <h6>{frontmatter.date}</h6>
            </section>
            <h2 className="mb-8 underline">{frontmatter.title}</h2>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <hr className="mt-10 mb-8" />
            <div className="flex items-center mb-10 lg:float-right">
              <span className="mr-4">Share this post</span>
              <span>
                <FacebookShareButton
                  url={`${HOME_URL}/articles${frontmatter.slug}`}
                  className="mr-2"
                >
                  <FacebookIcon size="40" round="true" />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${HOME_URL}/articles${frontmatter.slug}`}
                >
                  <TwitterIcon size="40" round="true" />
                </TwitterShareButton>
              </span>
            </div>
          </div>
          <div className="w-full col-span-3 ">
            <div className="p-4 mb-4 bg-gray-100 lg:mb-10">
              <h3 className="mb-2 font-medium text-gray-700">Archive</h3>
              <ul className="">
                {articles.nodes.map(
                  ({ childMarkdownRemark: { frontmatter } }) => (
                    <Link
                      to={`/articles${frontmatter.slug}`}
                      key={frontmatter.slug}
                      className="cursor:pointer"
                    >
                      <li>
                        <div className="items-center justify-center hover:text-blue-800">
                          <p className="pr-2 text-sm">{frontmatter.title}</p>
                          <h6 className="text-gray-400">{frontmatter.date}</h6>
                        </div>
                        <hr className="my-4" />
                      </li>
                    </Link>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ArticleTemplate.propTypes = {
  data: PropTypes.shape({
    article: PropTypes.shape({
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        author: PropTypes.string,
        date: PropTypes.date,
        featuredImage: PropTypes.shape({
          src: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.any,
            }),
          }),
        }),
        slug: PropTypes.string,
        title: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
    articles: PropTypes.object,
  }),
}

export const query = graphql`
  query($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
        featuredImage {
          alt
          src {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 85) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    articles: allFile(
      filter: { sourceInstanceName: { eq: "articles" }, ext: { eq: ".md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date
            slug
            title
          }
        }
      }
    }
  }
`
