/* eslint-disable no-undef */
import PropTypes from "prop-types"
import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import loadable from "@loadable/component"
import SEO from "../components/seo"
import Img from "gatsby-image"
import WhatWeDo from "../components/home/whatWeDo"
import Loading from "../components/loading"

const YOUTUBE_VID_IDS = ["g48AqQu2mPs", "H8FKgulJmGw", "AF9CX6YDp5I"]

const FBPOSTS = [
  "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2Fpfbid023bmPXUyhhVu2DUVYRhgDrR11X2pmk4sjKssgkiVLjU6aoZT6qg2g4zzJ2L4De2il&show_text=true",
  "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2Fpfbid02USj2GwcBrWWijACoUxBv5tr6gSX4Ltw41MuSf7qdjd1J1KxtyyTwRbB1iXg7rd5Sl&show_text=true",
  "https://www.facebook.com/plugins/video.php?&href=https%3A%2F%2Fwww.facebook.com%2FDOTrPH%2Fvideos%2F1154092472068446%2F&show_text=true",
  "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPATCA1962%2Fposts%2F3890168947762788&show_text=false",
]
const Landing = loadable(() => import("../components/home/landing"))
const VideoPlayer = loadable(() => import("../components/videoPlayer"))
const pStyles = ""

const IndexPage = ({ data }) => {
  const { tower, articles } = data
  const latestNews = articles.nodes[0].childMarkdownRemark
  const [vidId, setVidId] = useState(YOUTUBE_VID_IDS[0])

  return (
    <>
      <SEO title="Home" />
      <Landing fallback={<Loading inline={false} />} />

      <section className="mt-10">
        <div className="container w-11/12 mx-auto">
          <h2>News and Events</h2>
          <hr className="mb-4" />
          <div className="">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="md:col-span-3">
                <Link
                  to={`/articles${latestNews.frontmatter.slug}`}
                  key={latestNews.frontmatter.title}
                >
                  <div className="cursor-pointer">
                    {latestNews.frontmatter.featuredImage && (
                      <Img
                        fluid={
                          latestNews.frontmatter.featuredImage.src
                            .childImageSharp.fluid
                        }
                        alt={latestNews.frontmatter.title}
                        className="m-h-80"
                      />
                    )}
                    <div className="pt-2">
                      <h5 className="tracking-normal">
                        {latestNews.frontmatter.title}
                      </h5>
                      <small className="block mb-4 text-xs">
                        {latestNews.frontmatter.date}
                      </small>
                      <p className={`${pStyles} text-sm`}>
                        {latestNews.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div>
                {articles.nodes
                  .slice(1)
                  .map(({ childMarkdownRemark: { frontmatter } }) => (
                    <Link
                      to={`/articles${frontmatter.slug}`}
                      key={frontmatter.title}
                      className="hover:text-yellow-600"
                    >
                      <div className="cursor-pointer">
                        {frontmatter.featuredImage && (
                          <Img
                            fluid={
                              frontmatter.featuredImage.src.childImageSharp
                                .fluid
                            }
                            alt={frontmatter.title}
                            className="h-48"
                          />
                        )}
                        <div>
                          <h6 className="inline p-1 tracking-normal text-white bg-gray-400 rounded-sm">
                            {frontmatter.title}
                          </h6>
                          <small className="block mb-4 text-xs">
                            {frontmatter.date}
                          </small>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container w-11/12 py-0 mx-auto my-8 lg:my-16">
        <div>
          <h2>Who We Are</h2>
          <hr className="mb-10" />
          <div className="flex flex-col lg:flex-row">
            <Img
              fluid={tower.childImageSharp.fluid}
              className="w-full lg:w-9/12"
            />
            <div className="relative w-full px-0 mt-4 lg:w-3/12 lg:mt-0 lg:pl-6">
              <div className="mb-8">
                <h2>Our Purpose</h2>
                <p className={pStyles}>
                  To conduct a professional and protective organization for the
                  Air Traffic Management Officers of the Civil Aviation
                  Authority of the Philippines.
                </p>
              </div>
              <div className="">
                <h2>Our Vision</h2>
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

      <section className="container w-11/12 py-20 mx-auto" id="discover_patca">
        <h2>Discover PATCA</h2>
        <hr className="mb-6" />
        <div className="videos">
          <VideoPlayer url={`https://www.youtube.com/watch?v=${vidId}`} />
          <div className="flex justify-between gap-4">
            {YOUTUBE_VID_IDS.map(id => (
              <div key={id} className="w-1/3 cursor-pointer">
                <img
                  src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                  onClick={() =>
                    setVidId(`https://www.youtube.com/watch?v=${id}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="socialMedia">
          <div className="my-8">
            <h3>Social Media</h3>
            <p className="mt-4">
              Follow us on&nbsp;
              <a
                href="https://www.facebook.com/PATCA1962"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>
            </p>
          </div>
          <div className="flex flex-col justify-between gap-4 mt-4 lg:flex-row lg:items-start">
            {FBPOSTS.map(src => (
              <div key={src} className="flex-1">
                <iframe
                  src={src}
                  width="100%"
                  height="495"
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                />
              </div>
            ))}
          </div>
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
        sourceInstanceName: { regex: "/(articles|events)/" }
        childMarkdownRemark: { rawMarkdownBody: {} }
        extension: { eq: "md" }
      }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      limit: 4
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
          excerpt(pruneLength: 400)
        }
      }
    }
  }
`
