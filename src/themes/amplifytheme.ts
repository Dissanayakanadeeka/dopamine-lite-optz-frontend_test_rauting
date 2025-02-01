import { createTheme } from '@aws-amplify/ui-react';

export const theme = createTheme({
  name: 'biology-theme',
  tokens: {
    colors: {
      font: {
        
        primary: { value: '#333333' },
        secondary: { value: 'green' },
        tertiary: { value: 'green' }

      },
      brand: {
        primary: {
          10: { value: 'green' },
          80: { value: 'green' },
          90: { value: 'green' },
          100: { value: 'green' }
        }
      }
    },
    fonts:{

      heading: { value: 'Roboto, sans-serif' },
      body: { value: 'Roboto, sans-serif',  }
      
    },
    components: {
      card: {
        backgroundColor: { value: 'green' },
        outlined: {
          borderColor: { value: 'green' },
          backgroundColor: { value: 'green' }
        },
      },
      authenticator: {
      
        router: {
          borderWidth: { value: '0' },
          backgroundColor: { value: '#ffffff' }
        },
        footer: {
          paddingBottom: { value: '1rem' }
        },
        

      },
      button: {
        primary: {
          backgroundColor: { value: '#a7fcb8' },
          color: { value: '#2d3748' },
          _hover: {
            backgroundColor: { value: 'green' }
          },
          _focus: {
            backgroundColor: { value: 'green' }
          }
        },
        backgroundColor: { value: '#a7fcb8' },
        color: { value: '#2d3748' },
        _hover: {
          backgroundColor: { value: 'green' }
        },
        _focus: {
          backgroundColor: { value: 'green' }
        }
      },
      tabs: {
        borderColor: { value: 'green' },
        item: {
          color: { value: 'green' },
          _hover: { color: { value: '{colors.brand.primary.90}' } },
          _active: { color: { value: '{colors.brand.primary.90}' } }
        }
      }
    }
  }
});