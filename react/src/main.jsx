import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './Contexts/ContextProvider.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './Views/JobSearch/FooterDiv/Footer.jsx'
import { Box, Flex } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <ChakraProvider>
    <ContextProvider>
    <RouterProvider router ={router}/>
    <Flex direction="column" minHeight="100vh">
      <Box flex="1"></Box>
      <Footer />
    </Flex>
    </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>
,
)
