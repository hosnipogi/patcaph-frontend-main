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

      <section className="container flex items-center justify-center py-0 mx-auto my-8 lg:my-24">
        {/* <section className="container flex items-center justify-center py-10 mx-auto lg:h-screen lg:py-4"> */}
        <div className="mx-auto">
          <div className="flex flex-col w-11/12 mx-auto lg:flex-row">
            {/* <div className="lg:-mt-32"> */}
            <Img
              fluid={tower.childImageSharp.fluid}
              className="w-full lg:w-9/12"
            />
            {/* <section className="relative w-full mt-8 bg-white lg:w-1/2 lg:p-8 lg:float-right lg:-mt-32 z-1"> */}
            <div className="relative w-full px-0 mt-4 lg:w-3/12 lg:mt-0 lg:pl-6">
              <h4>Philippine Air Traffic Controllers{"'"} Association</h4>
              <h6>Since 1962</h6>
              <h1 className="mb-8 font-bold">One Goal. Safe Sky.</h1>
              <div className="mb-8">
                <h3>Our Purpose</h3>
                <p className={pStyles}>
                  To conduct a professional and protective organization for the
                  Air Traffic Management Officers of the Civil Aviation
                  Authority of the Philippines.
                </p>
              </div>
              <div className="">
                <h3>Our Vision</h3>
                <p className={pStyles}>
                  To safeguard with ceaseless vigilance the safety of the
                  aviation industry in recognition of the high degree of public
                  trust, confidence and responsibility placed on the members of
                  PATCA.
                </p>
              </div>
            </div>
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

      <section className="container block w-11/12 py-20 mx-auto">
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
              facebook
            </a>
          </p>
        </div>
        <div className="flex flex-col justify-between mt-4 flexitems-center lg:flex-row lg:items-start">
          <iframe
            className="flex-1"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3890168947762788&show_text=false&width=500"
            // width="500"
            height="495"
            // style="border:none;overflow:hidden"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <iframe
            className="flex-1"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3879193922193624&show_text=true&width=500"
            // width="500"
            height="495"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <iframe
            className="flex-1"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3877104149069268&show_text=true&width=500"
            // width="500"
            height="495"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          {/* <iframe
            className="flex-1"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3617665468346472&width=500&show_text=false&height=771&appId"
            // width="500"
            height="771"
            // style="border:none;overflow:hidden"
            scrolling="no"
            frameBorder="0"
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe> */}
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
