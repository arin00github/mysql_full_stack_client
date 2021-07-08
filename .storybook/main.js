module.exports = {
  "stories": [
    "../src/styleComp/**/*.stories.mdx",
    "../src/styleComp/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {name: `@storybook/addon-docs`,
     options : {configureJSX: true}
  }
  ]
}