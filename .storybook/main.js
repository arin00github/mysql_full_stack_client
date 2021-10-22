const path = require("path")
const fs = require("fs");
const { merge } = require("webpack-merge");

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}

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
    "@storybook/preset-create-react-app",
    "storybook-preset-craco",
  ],
  // webpackFinal: async (config, {configType}) => {
  //    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.

  //   config.module.rules.push({
  //     test: ''
  //   })
  // }

  webpackFinal: async (config) => {
    return merge(config, {
      resolve: {
        alias: {
          "@emotion/core": getPackageDir("@emotion/react"),
          "@emotion/styled": getPackageDir("@emotion/styled"),
          "emotion-theming": getPackageDir("@emotion/react"),
        },
      },
    });
  },
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