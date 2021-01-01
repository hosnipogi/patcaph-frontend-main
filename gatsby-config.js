/* eslint-disable no-undef */
const routes = require("./routes")

module.exports = {
  siteMetadata: {
    title: `PATCA ph`,
    description: `Offical website of the Philippine Air Traffic Controllers' Association`,
    author: `Hosni Bona <hosnibona@gmail.com>`,
    social: [
      {
        name: `facebook`,
        url: `https://facebook.com/PATCA1962`,
      },
      {
        name: `github`,
        url: `https://github.com/hosnipogi`,
      },
    ],
    routes,
  },
  // assetPrefix: `/main`,
  plugins: [
    // {
    //   resolve: `gatsby-plugin-htaccess`,
    //   options: {
    //     RewriteBase: true,
    //     https: false,
    //     SymLinksIfOwnerMatch: true,
    //     host: "localhost",
    //   },
    // },
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/content/staticPages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-theme-gallery",
      options: {
        basePath: "/gallery",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}