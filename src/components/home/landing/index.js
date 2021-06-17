import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import BackgroundSlider from "gatsby-image-background-slider"
import { Title, BGOverlay } from "./elements"

const Landing = () => {
  const data = useStaticQuery(graphql`
    query {
      backgrounds: allFile(filter: { relativeDirectory: { eq: "carousel" } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  `)

  const slides = data.backgrounds.nodes
    .map(({ relativePath }) => relativePath)
    .sort()

  console.log({ slides })

  return (
    <div className="relative">
      <Title>
        <h4 className="mb-6 text-white font-balto">
          PATCA in cooperation with CAAP ATS presents:
        </h4>
        <h3 className="landing-title_main">
          Building Psychological Resilience
        </h3>
        <hr />
        <div className="landing-title_section">
          <h3 className="landing-title_subheading">
            A webinar concerning mental health
          </h3>
          <h4 className="landing-title_subheading_minor">
            June 23, 2021, Wednesday
          </h4>
          <h4 className="landing-title_subheading_minor">1:00PM - 5:30PM</h4>
          {/* <CTA
            href="https://zoom.us/meeting/register/tJcrf-6hpz0iHNHcSX1dGDjaZO3csc2GsL58"
            target="_blank"
          >
            Register to Psychological Resilience Webinar
          </CTA> */}
          <Link
            to="/events"
            className="block w-8/12 p-3 mx-auto mt-10 text-xl font-bold transition duration-200 border-4 border-white lg:w-2/12 hover:bg-white hover:text-black"
          >
            View Event
          </Link>
        </div>
      </Title>
      <BGOverlay>
        <BackgroundSlider
          className=""
          query={data}
          initDelay={10} // delay before the first transition (if left at 0, the first image will be skipped initially)
          transition={1.5} // transition duration between images
          duration={3} // how long an image is shown
          // specify images to include (and their order) according to `relativePath`
          images={["carousel/e.png"]}
        />
      </BGOverlay>
    </div>
  )
}

export default Landing
