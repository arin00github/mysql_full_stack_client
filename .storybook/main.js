const path = require("path")

module.exports = {
  "typescript": {
    check: false,
    checkOption: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      allowSyntheticDefaultImports: false,
      shouldExtractLiteralValuesFromEnum: true,
    }
  },
  

  "stories": [ // location of your story files,
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  // webpackFinal: async (config, {configType}) => {
  //    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.

  //   config.module.rules.push({
  //     test: ''
  //   })
  // }
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