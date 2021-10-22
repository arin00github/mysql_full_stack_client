import { addDecorator } from '@storybook/react';
import Center from  '../src/stories/center/Center';
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import {theme} from '../src/theme/theme';
import { GlobalStyles} from '../src/theme/global';



export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// const decorator = [
// Story => (
//     <ThemeProvider theme={theme}>
    
//       <GlobalStyles />
//       <Story/>
      
//     </ThemeProvider>
//   )
// ]


// const themes = [theme];
// addDecorator(withThemesProvider(themes), ThemeProvider);