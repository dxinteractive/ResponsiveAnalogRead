/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.modifyWebpackConfig = ({config}) => {
    return config
        .loader("wasm", {
            test: /\.wasm$/,
            loaders: ['buffer-loader']
        })
        .merge({
            node: {
                fs: 'empty',
                child_process: 'empty'
            }
        });
};
