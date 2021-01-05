import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import tw, { styled } from "twin.macro"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs"

const AerodromeStyled = styled.section`
  height: 80vh;
  padding-top: 3rem;
  overflow: hidden;
  position: relative;
  z-index: 999;
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
    ${tw`absolute left-0 right-0 z-20 w-10/12 col-span-7 p-4 mx-auto text-white bg-black bottom-4 lg:py-12 lg:text-black lg:bg-transparent lg:relative`}
    h2 {
      ${tw`text-white lg:text-black`}
    }
    p {
      ${tw`my-5`}
    }
  }
`

export const Aerodrome = ({ img, html }) => (
  <AerodromeStyled>
    <div className="h-full grid-cols-12 lg:grid">
      <Img fluid={img} className="col-span-5" />
      <div
        className="whatwedo__aerodrome__text"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </AerodromeStyled>
)

export const CTA = styled(Link)`
  ${tw`hidden px-6 py-4 mt-6 font-semibold text-center text-white uppercase transition-all bg-blue-500 rounded-md cursor-pointer md:block hover:bg-blue-600`}
`
const arrowStyles = {
  position: "absolute",
  bottom: "-1%",
  zIndex: "30",
  cursor: "pointer",
  fontSize: "20px",
}

export const PrevArrow = ({ onClick }) => {
  return (
    <BsFillCaretLeftFill
      className="hover:opacity-50"
      style={{ ...arrowStyles, right: "40px" }}
      onClick={onClick}
    />
  )
}

export const NextArrow = ({ onClick }) => {
  return (
    <BsFillCaretRightFill
      className="hover:opacity-50"
      style={{ ...arrowStyles, right: "20px" }}
      onClick={onClick}
    />
  )
}

export const Dots = props => {
  const { onClick } = props
  return (
    <div
      className="mt-4 bg-black rounded-md opacity-25 cursor-pointer"
      style={{ height: "3px" }}
      onClick={onClick}
    />
  )
}

Dots.propTypes = {
  onClick: PropTypes.func,
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
}

NextArrow.propTypes = {
  onClick: PropTypes.func,
}

Aerodrome.propTypes = {
  html: PropTypes.any,
  img: PropTypes.any,
}
