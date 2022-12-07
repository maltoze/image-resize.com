const prodPlugins =
  process.env.NODE_ENV === 'production' ? [`gatsby-plugin-preact`] : [];

const config = {
  trailingSlash: 'always',
  siteMetadata: {
    siteUrl: `https://www.image-resize.com`,
  },
  plugins: [
    // use vercel analytics
    // {
    //   resolve: 'gatsby-plugin-google-gtag',
    //   options: {
    //     trackingIds: ['G-KFVQW5X785'],
    //     pluginConfig: {
    //       head: true,
    //     },
    //   },
    // },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        display: `standalone`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-mdx`,
    ...prodPlugins,
  ],
};

module.exports = config;
