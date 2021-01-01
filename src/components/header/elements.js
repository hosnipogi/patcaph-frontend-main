import tw, { styled } from "twin.macro"

export const Banner = styled.div`
  ${tw`pt-12 pb-10 mt-12 transition-all duration-150 shadow-md lg:pt-32 lg:pb-24 lg:mt-0`}
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-position: center top;
  position: relative;
  &::before {
    content: "";
    display: block;
    min-height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    background: linear-gradient(90deg, #003b5c 0%, rgba(255, 255, 255, 0) 100%);
    top: 0;
  }
  div {
    ${tw`container w-11/12 px-4 mx-auto lg:px-0`}
    h2 {
      ${tw`relative z-10 font-medium text-white font-balto`}
    }
  }
`

export const Nav = styled.div`
  ${tw`top-0 z-30 z-50 block w-full transition-all duration-75 ease-linear shadow-lg hover:bg-gray-100 hover:bg-opacity-100 md:px-10`}
  ${({ path }) =>
    path === "/"
      ? tw`fixed bg-black lg:absolute lg:bg-opacity-50`
      : tw`fixed top-0 bg-gray-900 lg:relative`}
        .nav__main {
    ${tw`relative z-30`}
    &__mobile {
      ${tw`flex items-center justify-between py-2 lg:hidden`}
      &__link {
        ${tw`w-1/3`}
        &__logo {
          ${tw`h-10 p-2`}
          fill: #fff;
        }
      }
      &__button {
        &__menu {
          fill: #fff;
          ${tw`h-10 p-2`}
        }
      }
    }
    &__desktop {
      ${tw`fixed right-0 z-30 justify-between block w-3/5 h-screen transition duration-150 ease-in-out transform bg-gray-200 lg:py-4 lg:bg-black lg:translate-x-0 lg:flex lg:py-0 lg:h-auto lg:relative lg:w-auto lg:bg-transparent`}
      ${({ showDrawer }) =>
        showDrawer ? tw`translate-x-0` : tw`translate-x-full`}
      &__routes {
        ${tw`items-center justify-between lg:flex`}
        > a:first-of-type {
          ${tw`p-0 border-0`}
          svg {
            ${tw`hidden lg:block`}
            width: 12rem;
            fill: #fff;
          }
        }
        &__links {
          ${tw`relative items-center hidden block p-4 text-sm font-medium uppercase border-transparent cursor-pointer lg:border-b-4 lg:mr-10 lg:text-white lg:block lg:py-8 hover:text-blue-600 lg:hover:border-blue-600 hover:bg-gray-200 lg:hover:bg-transparent`}
          &__icon {
            ${tw`inline mr-4 text-lg lg:hidden`}
          }
          &:hover {
            .nav__main__desktop__routes__subroutes {
              ${tw`block`}
            }
          }
        }
        &__subroutes {
          ${tw`absolute top-0 hidden mt-12 bg-gray-200 rounded-lg`}
          width: 16rem;
        }
      }
      hr {
        ${tw`block p-2 lg:hidden`}
      }
      &__user {
        ${tw`relative items-center lg:flex`}
        &__email {
          ${tw`block p-4 mb-4 text-sm font-medium cursor-pointer lg:mb-0 lg:p-0 lg:text-white`}
        }
        &__submenu {
          ${tw`z-10 lg:hidden lg:shadow-lg lg:absolute lg:right-0 lg:rounded-md lg:w-60`};
          right: 0.625rem;
          top: 80%;
          &__link {
            ${tw`flex items-center p-6 px-8 m-0 text-black cursor-pointer bg-gray-50 hover:bg-gray-200 lg:bg-gray-300`}
            &__icon {
              ${tw`inline mr-4 text-lg`}
            }
            &:first-of-type {
              ${tw`border-gray-300 lg:border-b lg:rounded-t-lg`}
            }
            &:last-child {
              ${tw`border-0 lg:rounded-b-lg`}
            }
            &:hover {
              .nav__main__desktop__user__submenu__link {
                &__icon,
                &__text {
                  ${tw`text-blue-600`}
                }
              }
            }
          }
        }
        &:hover {
          .nav__main__desktop__user__submenu {
            display: block;
          }
        }
      }
    }
  }
  &:hover {
    .nav__main {
      &__mobile {
        svg {
          fill: black;
        }
      }
      &__desktop {
        &__routes {
          > a {
            ${tw`text-black hover:text-blue-600`}
            > svg {
              fill: #333;
            }
          }
          > div {
            ${tw`text-black`}
          }
        }
        &__user {
          span:first-of-type {
            ${tw`text-black`}
          }
        }
      }
    }
  }
`
