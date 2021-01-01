/* eslint-disable no-undef */
import PropTypes from "prop-types"
import React from "react"
import { graphql, Link } from "gatsby"
import loadable from "@loadable/component"
import SEO from "../components/seo"
import Img from "gatsby-image"
import WhatWeDo from "../components/home/whatWeDo"
import Loading from "../components/loading"

const Landing = loadable(() => import("../components/home/landing"))
const VideoPlayer = loadable(() => import("../components/videoPlayer"))
const pStyles = ""

const IndexPage = ({ data }) => {
  const { tower, articles } = data

  return (
    <>
      <SEO title="Home" />
      <Landing fallback={<Loading inline={false} />} />

      <section className="container flex items-center justify-center py-10 mx-auto lg:h-screen lg:py-4">
        <div className="w-11/12 mx-auto lg:w-10/12">
          <section className="relative z-10 w-full h-full mb-8 bg-white lg:w-1/2 lg:p-8 z-1 lg:mb-0">
            <h5>Our Purpose</h5>
            <p className={pStyles}>
              To conduct a professional and protective organization for the Air
              Traffic Management Officers of the Civil Aviation Authority of the
              Philippines.
            </p>
          </section>
          <div className="lg:-mt-32">
            <Img fluid={tower.childImageSharp.fluid} />
            <section className="relative w-full mt-8 bg-white lg:w-1/2 lg:p-8 lg:float-right lg:-mt-32 z-1">
              <h2>Our Vision</h2>
              <p className={pStyles}>
                To safeguard with ceaseless vigilance the safety of the aviation
                industry in recognition of the high degree of public trust,
                confidence and responsibility placed on the members of PATCA.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* React slick carousel here */}
      <WhatWeDo />

      <section className="container w-11/12 py-20 mx-auto">
        <div className="text-center">
          <h5>media</h5>
          <h2>Discover PATCA</h2>
        </div>
        <div className="grid-cols-2 gap-4 lg:grid">
          <VideoPlayer url="https://www.youtube.com/watch?v=H8FKgulJmGw&t=3s" />
          <VideoPlayer url="https://www.youtube.com/watch?v=AF9CX6YDp5I" />
        </div>
      </section>

      <section className="py-20 bg-gray-200">
        <div className="container w-11/12 mx-auto">
          <div className="block grid-cols-3 gap-4 lg:grid">
            <div>
              <h2>Latest News</h2>
              <p className={pStyles}>
                Discover the latest new, media statements and other
                announcements from PATCA.
              </p>
              <Link
                to="/articles"
                className="block pr-10 my-4 text-right text-blue-500 lg:my-6 hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
            <div className="flex flex-row justify-around col-span-2">
              <div className="grid gap-2 md:grid-cols-2">
                {articles.nodes.map(article => (
                  <Link
                    to={`/articles${article.childMarkdownRemark.frontmatter.slug}`}
                    key={article.childMarkdownRemark.frontmatter.title}
                  >
                    <div
                      className="transition-all duration-100 bg-white border-gray-100 shadow-md cursor-pointer hover:shadow-xl"
                      style={{ minHeight: "420px" }}
                    >
                      {article.childMarkdownRemark.frontmatter
                        .featuredImage && (
                        <Img
                          fluid={
                            article.childMarkdownRemark.frontmatter
                              .featuredImage.src.childImageSharp.fluid
                          }
                          alt={article.childMarkdownRemark.frontmatter.title}
                          className="object-cover w-full h-64"
                        />
                      )}
                      <div className="p-2">
                        <h5 className="mb-2 tracking-normal">
                          {article.childMarkdownRemark.frontmatter.title}
                          <small>
                            &nbsp;
                            {article.childMarkdownRemark.frontmatter.date}
                          </small>
                        </h5>
                        <p className={`${pStyles} text-sm`}>
                          {article.childMarkdownRemark.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container block w-11/12 h-full grid-cols-3 gap-4 pt-20 pb-10 mx-auto lg:grid">
        <div>
          <h2>Social Media</h2>
          <p className="mt-4">
            Follow us on&nbsp;
            <a
              href="https://www.facebook.com/PATCA1962"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              facebook &rarr;
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center col-span-2 mt-10 lg:items-start md:justify-around md:flex-row">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3426531290793225&show_text=false&width=350&appId=272423870799184&height=500"
            width="350"
            height="600"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
            className="w-full overflow-hidden"
          ></iframe>
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3391772064269148&show_text=false&width=350&appId=272423870799184&height=500"
            width="350"
            height="700"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
            className="w-full overflow-hidden"
          ></iframe>
        </div>
      </section>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.any,
}

export default IndexPage

export const query = graphql`
  {
    tower: file(relativePath: { eq: "bak/tower-rpll.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1024, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    articles: allFile(
      filter: {
        sourceInstanceName: { eq: "articles" }
        childMarkdownRemark: { rawMarkdownBody: {} }
        extension: { eq: "md" }
      }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      limit: 2
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date
            featuredImage {
              alt
              src {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            slug
            title
          }
          excerpt
        }
      }
    }
  }
`