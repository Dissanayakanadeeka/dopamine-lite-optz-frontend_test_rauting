import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ChakraInitialProvider } from "@/components/ui/provider"
import App from './App.tsx'
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import { Provider } from 'react-redux'
import { store } from './state'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

Amplify.configure(config)
// const Demo = () => {
//   return (
//     <MenuRoot>
//       <MenuTrigger asChild>
//         <Button variant="outline" size="sm">
//           Open
//         </Button>
//       </MenuTrigger>
//       <MenuContent>
//         <MenuItem value="new-txt-a">
//           New Text File <MenuItemCommand>⌘E</MenuItemCommand>
//         </MenuItem>
//         <MenuItem value="new-file-a">
//           New File... <MenuItemCommand>⌘N</MenuItemCommand>
//         </MenuItem>
//         <MenuItem value="new-win-a">
//           New Window <MenuItemCommand>⌘⇧N</MenuItemCommand>
//         </MenuItem>
//         <MenuItem value="open-file-a">
//           Open File... <MenuItemCommand>⌘O</MenuItemCommand>
//         </MenuItem>
//         <MenuItem value="export-a">
//           Export <MenuItemCommand>⌘S</MenuItemCommand>
//         </MenuItem>
//       </MenuContent>
//     </MenuRoot>
//   )
// }


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraInitialProvider >
        <ChakraProvider value={defaultSystem}>
      <App />
      </ChakraProvider>
      {/* <Demo /> */}
      </ChakraInitialProvider>
    </Provider>
  </React.StrictMode>,
)