// @flow
const {gatsbyConfig} = require('dcme-gatsby/src/gatsby/gatsby-config');

gatsbyConfig.plugins.unshift({
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
        modules: [`dcme-gatsby`, `dcme-style`],
        test: /\.jsx?$/
    }
});

module.exports = {
    siteMetadata: {
        title: 'ResponsiveAnalogRead'
    },
    ...gatsbyConfig
};
