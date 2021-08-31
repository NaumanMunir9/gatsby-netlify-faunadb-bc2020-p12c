module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "My Gatsby Site",
  },
  plugins: [
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://gatsby-faunadb-netlifyfunc-mnm-p12c.netlify.app/`,
      },
    },
  ],
};
