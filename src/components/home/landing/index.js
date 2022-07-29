import React from "react"
import { graphql, useStaticQuery } from "gatsby"
// import BackgroundSlider from "gatsby-image-background-slider"
import { BGOverlay } from "./elements"
// import Particles from "react-particles-js"
import BackgroundImage from "gatsby-background-image"

const Landing = () => {
  const data = useStaticQuery(graphql`
    query Patca60BGImage {
      file(relativePath: { eq: "temporary/patca60_logo.png" }) {
        id
        childImageSharp {
          fluid(quality: 100, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  // const slides = data.backgrounds.nodes.map(({ relativePath }) => relativePath)
  console.log({ s: data.file.childImageSharp.fluid })
  return (
    <div className="relative">
      {/* <div className="p-100">
        <div
          className="w-full h-screen bg-center bg-cover "
          style={{
            backgroundImage: `url('${data.file.childImageSharp.fluid.srcWebp}')`,
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // minHeight: "100vh",
            // width: "100%",
          }}
        />
      </div> */}
      {/* <Title>
        <div className="landing-title_section">
          <h3 className="landing-title_subheading">
            Philippine Air Traffic Controllers&apos; Association
          </h3>
          <h5 className="landing-title_subheading_minor">Since 1962</h5>
        </div>
      </Title> */}
      <BGOverlay>
        <BackgroundImage
          Tag="section"
          fluid={data.file.childImageSharp.fluid}
          backgroundColor={`#040e18`}
          className="grid h-screen"
        ></BackgroundImage>
      </BGOverlay>
      {/* <Title>
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
      </BGOverlay> */}
    </div>
  )
}

export default Landing
