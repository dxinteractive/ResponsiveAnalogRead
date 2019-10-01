/* eslint-disable */

//const {onCreateWebpackConfig} = require('dcme-gatsby/lib/gatsby/gatsby-node');
exports.onCreateWebpackConfig = ({loaders, actions}) => {
  actions.setWebpackConfig({
    node: {
      "fs": 'empty'
    },
    module: {
      rules: [
        // Emscripten JS files define a global. With `exports-loader` we can
        // load these files correctly (provided the global’s name is the same
        // as the file name).
        {
          test: /wasm\.js$/,
          loader: "exports-loader"
        },
        // wasm files should not be processed but just be emitted and we want
        // to have their public URL.
        {
          test: /wasm\.wasm$/,
          type: "javascript/auto",
          loader: "file-loader",
          // options: {
          //   publicPath: "dist/"
          // }
        }
        // {
        //   test: /\.mdx?$/,
        //   use: [
        //     loaders.js(),
        //     '@mdx-js/loader'
        //   ]
        // }
      ]
    }
  });
}


// kill all jest child processes that hang around after build,
// which stop netlify from recognising that build is complete
// this likely happens due to the usage of setInterval within code that
// ends up in the gatsby site

const ChildProcess = require('child_process');

exports.onPostBuild = () => {
    console.log("Killing jest...");
    ChildProcess.execSync("ps aux | grep jest | grep -v grep | awk '{print $2}' | xargs kill");
    console.log("Jest is dead");
};
