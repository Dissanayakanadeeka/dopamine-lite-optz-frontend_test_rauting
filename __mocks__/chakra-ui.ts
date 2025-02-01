import { jest } from '@jest/globals';

export const createStandaloneToast = jest.fn(() => ({
    toast: jest.fn(),
  }));
  
  // Mock other components as needed
  export const ChakraDrawer = {
    Trigger: 'div',
    Root: 'div',
    Footer: 'div',
    Header: 'div',
  };
  export const Toaster = 'div';
  export const Portal = ({ children }) => <div>{children}</div>;
  export const Spinner = 'div';
  export const Stack = 'div';
  export const Toast = {
    Root: 'div',
  };

module.exports = require("jest-mock")();
