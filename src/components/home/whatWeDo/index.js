import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Aerodrome } from "./elements"

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: false,
}

const index = () => {
  const { acc, radar, rpllTower, towerToned } = useStaticQuery(graphql`
    {
      towerToned: file(
        relativePath: { eq: "background/tower_view_2tone.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rpllTower: file(relativePath: { eq: "background/manila_tower.png" }) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      radar: file(relativePath: { eq: "background/radar.png" }) {
        childImageSharp {
          fluid(quality: 80, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      acc: file(relativePath: { eq: "background/acc.jpg" }) {
        childImageSharp {
          fluid(quality: 80, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <section id="whatwedo">
      <Slider {...sliderSettings}>
        <BackgroundImage Tag="section" fluid={towerToned.childImageSharp.fluid}>
          <div className="container flex flex-col items-center justify-center w-11/12 mx-auto h-screen-90">
            <h2 className="text-white">What We Do</h2>
            <div className="text-center text-white lg:w-6/12">
              <p className="my-10">
                We are the Air Traffic Management Officers of the Civil Aviation
                Authority of the Philippines. Our main objective is to provide
                air traffic control service.
              </p>
              {/* <p>
              The Air Traffic Service is one of the two (2) Services under the
              Civil Aviation Authority of the Philippines mandated to do the
              following:
            </p>
            <ul>
              <li>
                Provision and management of Air Traffic Services in accordance
                with established national and ICAO standards and recommended
                practices.
              </li>
              <li>
                Administration and implementation of operational plans and
                programs.
              </li>
              <li>
                Establishment and proper utilization of controlled and navigable
                airspace within the Manila Flight Information Region.
              </li>
              <li>
                Development of ATS rules, regulations, procedures, standards and
                policies.
              </li>
              <li>
                Provision of training and career development of ATS personnel.
              </li>
            </ul> */}
              <p>
                Air traffic control service is a service provided for the
                purpose of:
              </p>
              <ul>
                <li>
                  preventing collisions:
                  <ul>
                    <li>between aircraft</li>
                    <li>
                      and on the manoeuvring area between aircraft and
                      obstructions;
                    </li>
                  </ul>
                </li>
                <li>
                  and expediting and maintaining an orderly flow of air traffic.
                  (ICAO Annex 11)
                </li>
              </ul>
              {/* <CTA to="/gallery">View Gallery</CTA> */}
            </div>
          </div>
        </BackgroundImage>

        <Aerodrome img={rpllTower.childImageSharp.fluid} />

        <BackgroundImage Tag="section" fluid={radar.childImageSharp.fluid}>
          <div className="container w-11/12 mx-auto">
            <div className="pt-32 text-white lg:w-1/2 h-screen-90">
              <h2 className="text-white ">Approach Control Service</h2>
              <p className="mt-10">
                Air traffic control service for arriving or departing controlled
                flights.
              </p>
              <p>
                It is provided by an aerodrome control tower or area control
                center when it is necessary or desirable to combine the
                functions of the approach control services with those of the
                aerodrome control service or the area control service under the
                responsibility of one unit.
              </p>
              <p>
                The service may also be provided by an approach control office
                when it is desirable or necessary to establish a separate unit.
              </p>
            </div>
          </div>
        </BackgroundImage>

        <BackgroundImage Tag="section" fluid={acc.childImageSharp.fluid}>
          <div className="container w-11/12 pt-48 mx-auto h-screen-90 ">
            <div className="grid-cols-2 text-white lg:text-right lg:grid">
              <div></div>
              <div>
                <h2 className="text-white">Area Control Service</h2>
                <p className="my-10">
                  Air traffic control service for controlled flights in control
                  areas. It is provided by an area control service or by the
                  unit providing approach control service in a controlled zone.
                  The service may also be in a control area of limited extent
                  that has been designated primarily to provide approach control
                  service where no area control center is established.
                </p>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </Slider>
    </section>
  )
}

export default index
