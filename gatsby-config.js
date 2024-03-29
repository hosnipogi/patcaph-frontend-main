/* eslint-disable no-undef */
const routes = require("./routes")
const fs = require("fs")

if (fs.existsSync("../backend/.env")) {
  const path = require("path")
  require("dotenv").config({
    path: `${path.resolve(`${process.cwd()}/../backend/.env`)}`,
  })
}

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Philippine Air Traffic Controllers' Association`,
    description: `Offical website of the Philippine Air Traffic Controllers' Association`,
    author: `Hosni Bona <hosnibona@gmail.com>`,
    siteUrl: process.env.GATSBY_HOME_URL || `https://patca.ph`,
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
  assetPrefix: `/main`,
  plugins: [
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
        name: `events`,
        path: `${__dirname}/content/events`,
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
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#3498db`,
        showSpinner: false,
        minimum: 0.2,
        speed: 500,
        trickleSpeed: 80,
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
        icon: `src/images/PATCA-Logo-512.png`, // This path is relative to the root of the site.
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GA_TRACKING_ID, // Google Analytics / GA
        ],
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          // anonymize_ip: true,
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          head: true,
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
