import PropTypes from "prop-types"
import React from "react"
import { graphql, Link } from "gatsby"
import { Card, CardBody } from "@windmill/react-ui"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import { DOMAIN } from "../../lib/config/URLs"
import BackgroundImage from "gatsby-background-image"
import "../../styles/md.css"

export default function Template({ data }) {
  const { article, articles } = data
  const { frontmatter, html } = article

  return (
    <>
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
                  url={`${DOMAIN}${frontmatter.slug}`}
                  className="mr-2"
                >
                  <FacebookIcon size="40" round="true" />
                </FacebookShareButton>
                <TwitterShareButton url={`${DOMAIN}${frontmatter.slug}`}>
                  <TwitterIcon size="40" round="true" />
                </TwitterShareButton>
              </span>
            </div>
          </div>
          <div className="w-full col-span-3 ">
            <Card colored className="p-4 mb-4 bg-gray-100 lg:mb-10 mb-">
              <CardBody>
                <h3 className="font-medium text-gray-700">Archive</h3>
                <ul className="px-4">
                  {articles.edges.map(({ node: { frontmatter } }) => (
                    <Link
                      to={`/articles${frontmatter.slug}`}
                      key={frontmatter.slug}
                      className="my-4 text-sm list-disc hover:underline cursor:pointer"
                    >
                      <li>
                        {frontmatter.title} - {frontmatter.date}
                      </li>
                    </Link>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

Template.propTypes = {
  data: PropTypes.shape({
    article: PropTypes.shape({
      frontmatter: PropTypes.shape({
        author: PropTypes.any,
        date: PropTypes.any,
        featuredImage: PropTypes.shape({
          src: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.shape({
                src: PropTypes.any,
              }),
            }),
          }),
        }),
        slug: PropTypes.any,
        title: PropTypes.any,
      }),
      html: PropTypes.any,
    }),
    articles: PropTypes.any,
  }),
}

export const query = graphql`
  query($id: String!, $slug: StringQueryOperatorInput = { ne: null }) {
    article: markdownRemark(id: { eq: $id }) {
      html
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
    articles: allMarkdownRemark(filter: { frontmatter: { slug: $slug } }) {
      edges {
        node {
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD YYYY")
          }
        }
      }
    }
  }
`
