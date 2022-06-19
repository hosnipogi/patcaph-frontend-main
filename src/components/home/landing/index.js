import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundSlider from "gatsby-image-background-slider"
import { BGOverlay, Title } from "./elements"

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

  const slides = data.backgrounds.nodes.map(({ relativePath }) => relativePath)

  return (
    <div className="relative">
      <Title>
        <h1 className="landing-title_main">
          One goal. <br />
          Safe sky.
        </h1>
        <hr />
        <div className="landing-title_section">
          <h3 className="landing-title_subheading">
            Philippine Air Traffic Controllers&apos; Association
          </h3>
          <h5 className="landing-title_subheading_minor">Since 1962</h5>
        </div>
      </Title>
      <BGOverlay>
        <BackgroundSlider
          className=""
          query={data}
          initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
          transition={1.5} // transition duration between images
          duration={3} // how long an image is shown
          // specify images to include (and their order) according to `relativePath`
          images={slides}
        />
      </BGOverlay>
    </div>
  )
}

export default Landing
