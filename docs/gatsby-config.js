// @flow
module.exports = {
    pathPrefix: '/ResponsiveAnalogRead',
    siteMetadata: {
        title: 'ResponsiveAnalogRead'
    },
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    `gatsby-remark-prismjs`
                ]
            }
        }
    ]
};
