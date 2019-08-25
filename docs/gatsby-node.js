/* eslint-disable */

const {onCreateWebpackConfig} = require('dcme-gatsby/lib/gatsby/gatsby-node');
exports.onCreateWebpackConfig = onCreateWebpackConfig;

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
