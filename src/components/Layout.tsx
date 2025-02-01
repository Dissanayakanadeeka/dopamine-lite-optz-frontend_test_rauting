import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { DopamineLiteColors } from '@/themes/colors';

export default function Layout() {
  return (
    <Flex flexDirection="column" minH="100vh" position={'relative'}>
      <Navbar />
      <Box flex="1" bg={DopamineLiteColors.creamColor} w="100%" position={'relative'} >
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}