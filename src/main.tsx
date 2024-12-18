import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
  colors: {
    ignitionPrimary: {
      50: '#000000',
      100: '#000000',
      200: '#000000',
      300: '#000000',
      400: '#000000',
      500: '#000000',
      600: '#000000',
      700: '#000000',
      800: '#FF7454',
      900: '#F4502A',
    },
  },
  components: {
    Link: {
      variants: {
        primary: ({ colorScheme = "purple" }) => ({
          color: `${colorScheme}.600`,
          _hover: {
            color: `${colorScheme}.800`,
          },
        }),
      },
      defaultProps: {
        variant: "primary",
      },
    },
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
