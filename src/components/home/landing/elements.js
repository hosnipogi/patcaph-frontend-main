import tw, { styled } from "twin.macro"

export const BGOverlay = styled.section`
  ${tw`w-full lg:mt-0 lg:h-screen`}
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-image: radial-gradient(
      circle at 70%,
      rgb(11 10 31 / 0.1) 0,
      rgb(11 11 23 / 85%) 65%
    );
  }
`

export const Title = styled.div`
  ${tw`relative z-10 text-white lg:absolute`}
  top: 35vh;
  left: 10vw;
  .landing-title_main {
    ${tw`text-3xl lg:text-6xl`}
    line-height: 4.8rem;
    color: white;
    font-family: "Balto";
  }
  hr {
    ${tw`my-1 lg:my-3`}
  }
  .landing-title_section {
    .landing-title_subheading {
      ${tw`text-lg`}
      color: white;
      font-family: "Balto";
    }
    .landing-title_subheading_minor {
      color: white;
      font-family: "balto";
      text-transform: initial;
    }
  }
  @media (max-width: 1024px) {
    top: 0;
    left: 0;
    padding: 20vmin;
    .landing-title_main {
      line-height: initial;
    }
  }
  @media (max-width: 760px) {
    top: 0;
    left: 0;
    padding: 25vh 4rem;
    .landing-title_main {
      line-height: initial;
    }
  }
`

export const CTA = styled.a`
  ${tw`relative z-50 hidden px-6 py-4 mt-6 font-semibold text-center text-white uppercase transition-all bg-blue-500 rounded-md cursor-pointer md:block hover:bg-blue-600`};
`
