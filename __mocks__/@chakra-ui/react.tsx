import React from 'react';

export const createStandaloneToast = jest.fn(() => ({
  toast: jest.fn(),
}));

// Mock other components as needed
export const ChakraDrawer = {
  Trigger: 'div',
  Root: 'div',
  Footer: 'div',
  Header: 'div',
  Content: 'div',
  Overlay: 'div',
  CloseButton: 'div',
  Body: 'div',
};
export const Toaster = 'div';
export const Portal = ({ children }) => <div>{children}</div>;
export const Spinner = 'div';
export const Stack = 'div';
export const Toast = {
  Root: 'div',
};
export const Box = 'div';