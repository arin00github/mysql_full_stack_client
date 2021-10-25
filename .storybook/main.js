const path = require("path")

module.exports = {
  "typescript": {
    check: false,
    checkOption: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      allowSyntheticDefaultImports: false,
      shouldExtractLiteralValuesFromEnum: true,
    },
    
  },
  

  "stories": [ // location of your story files,
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    //"storybook-addon-styled-component-theme/dist/preset",
  ],
  webpackFinal: async (config, {configType}) => {
     // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.modules = [ path.resolve(__dirname, ".."), "node_modules", "styles", ];

    config.plugins.push(
      // Removing Speedy so the static storybook styling doesn't break
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      })
    );



    return config;
  }
}

// module.exports = ({ config, mode }) => {
//   config.module.rules.push({
//     test: /\.(ts|tsx)$/,
//     use: [
//       {
//         loader: require.resolve("babel-loader"),
//         options: {
//           presets: [["react-app", { flow: false, typescript: true }]],
//         },
//       },
//       require.resolve("react-docgen-typescript-loader"),
//     ],
//   });
//   config.resolve.extensions.push(".ts", ".tsx");
//   return config;
// };