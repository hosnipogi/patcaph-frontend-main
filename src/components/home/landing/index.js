import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
// import BackgroundSlider from "gatsby-image-background-slider"
import { Title } from "./elements"
import Particles from "react-particles-js"

const Landing = () => {
  const data = useStaticQuery(graphql`
    query {
      imageSharp(fluid: { originalName: { eq: "brain.png" } }) {
        fluid(maxWidth: 1024, quality: 90) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `)

  return (
    <div
      style={{
        backgroundImage: `url(${data.imageSharp.fluid.src})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 40%",
        height: "98vh",
      }}
    >
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
            // shape: {
            //   type: "circle",
            //   stroke: {
            //     width: 0,
            //     color: "#000000",
            //   },
            //   polygon: {
            //     nb_sides: 4,
            //   },
            //   image: {
            //     src: "img/github.svg",
            //     width: 100,
            //     height: 100,
            //   },
            // },
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
            className="block w-8/12 p-3 mx-auto mt-10 text-xl font-bold transition duration-200 border-4 border-white lg:w-2/12 hover:bg-white hover:text-black"
          >
            View Event
          </Link>
        </div>
      </Title>
      {/* <BGOverlay>
        <BackgroundSlider
          className=""
          query={data}
          initDelay={10} // delay before the first transition (if left at 0, the first image will be skipped initially)
          transition={1.5} // transition duration between images
          duration={3} // how long an image is shown
          // specify images to include (and their order) according to `relativePath`
          images={["carousel/e.png"]}
        />
      </BGOverlay> */}
    </div>
  )
}

export default Landing
