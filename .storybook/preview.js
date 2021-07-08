

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}



//  addParameters, addDecorator 대신 export const parameter = {} 혹은 export const decorators = [] 사용을 권장