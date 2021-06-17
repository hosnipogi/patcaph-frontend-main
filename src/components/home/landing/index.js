import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
// import BackgroundSlider from "gatsby-image-background-slider"
import { Title } from "./elements"
import Particles from "react-particles-js"
import BackgroundImage from "gatsby-background-image"

const Landing = () => {
  const data = useStaticQuery(graphql`
    query BGImage {
      file(relativePath: { eq: "carousel/brain.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      Tag="section"
      fluid={data.file.childImageSharp.fluid}
      backgroundColor={`#040e18`}
      className="grid h-screen"
    >
      <div
        style={{ gridArea: "1 / 1 / 2 / 2" }}
        className="z-10 flex items-center justify-center text-center"
      >
        <Title>
          <h4 className="mb-2 text-white font-balto">
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
            <Link
              to="/events"
              className="block w-6/12 p-3 mx-auto mt-10 text-xl font-bold transition duration-200 border-4 border-white hover:bg-white hover:text-black"
            >
              View Event
            </Link>
          </div>
        </Title>
      </div>
      <Particles
        params={{
          particles: {
            number: {
              value: 45,
              density: {
                enable: true,
                value_area: 2000,
              },
            },
            color: {
              value: "#ffffff",
            },
            opacity: {
              value: 0.1,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 5,
              // random: true,
              anim: {
                enable: true,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.07,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      ></Particles>
    </BackgroundImage>
  )
}

export default Landing
