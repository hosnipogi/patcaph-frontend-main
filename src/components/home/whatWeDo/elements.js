import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import tw, { styled } from "twin.macro"

const AerodromeStyled = styled.section`
  height: 90vh;
  padding-top: 3rem;
  overflow: hidden;
  @media (min-width: 768px) {
    background-image: linear-gradient(white 5%, #459ef0);
  }
  img {
    height: 100% !important;
    width: auto !important;
    @media (max-width: 768px) {
      background: linear-gradient(white 5%, #459ef0);
    }
  }
  .whatwedo__aerodrome__text {
    ${tw`absolute left-0 right-0 w-10/12 col-span-7 p-4 mx-auto text-white bg-black bottom-10 lg:py-12 lg:text-black lg:bg-transparent lg:relative`}
  }
`

export const Aerodrome = ({ img }) => (
  <AerodromeStyled>
    <div className="h-full grid-cols-12 lg:grid">
      <Img fluid={img} className="col-span-5" />
      <div className="whatwedo__aerodrome__text">
        <h2 className="text-white lg:text-black">Aerodrome Control Service</h2>
        <p className="my-10">
          Air traffic control services for aerodrome traffic. The service is
          provided by an aerodrome control tower. The task of providing
          specified services on the apron (e.g., apron management service) may
          be assigned to an aerodrome control tower or to a separate unit.
        </p>
        <p className="">
          The <strong>Aerodrome Control Tower</strong> is a unit established to
          provide air traffic control service to aerodrome traffic. The tower is
          responsible for issuing information and clearances to aircraft under
          its control to achieve a safe, orderly, and expeditious flow of air
          traffic
        </p>
      </div>
    </div>
  </AerodromeStyled>
)

export const CTA = styled(Link)`
  ${tw`hidden px-6 py-4 mt-6 font-semibold text-center text-white uppercase transition-all bg-blue-500 rounded-md cursor-pointer md:block hover:bg-blue-600`}
`

Aerodrome.propTypes = {
  img: PropTypes.any,
}
