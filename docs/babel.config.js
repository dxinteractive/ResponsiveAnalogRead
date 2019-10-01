/* eslint-disable */
module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["blueflag", {"browser": true, "library": true}]
  ];
  const plugins = [
    ["@babel/plugin-syntax-dynamic-import"]
  ];

  return {
    presets,
    plugins
  };
}
