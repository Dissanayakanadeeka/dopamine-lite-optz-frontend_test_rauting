import { Box, Flex, Button, Stack, Image, Text, Link } from '@chakra-ui/react';
import dopamineLogo from '@/assets/dopamine_logo.jpg';
import { DopamineLiteColors } from '@/themes/colors';

export default function NavbarStatic() {



  return (
     <Box bg={DopamineLiteColors.greenColor}  position="sticky" top="0" zIndex={2} w="100%">
      <Flex h={16} alignItems="center" justifyContent="space-between" px={4}>
        <Link onClick={()=>{}} >
          <Flex alignItems="center">
            <Image h="40px" src={dopamineLogo} alt="Logo" />
            <Text ml={3} fontSize="xl" fontWeight="bold" color="biology.600">
              Dopamine Lite
            </Text>
          </Flex>
        </Link>

        <Flex alignItems="center">
          <Stack direction="row" gap={7}>
            <Button variant={'outline'} borderColor={'#00712D'} color={'white'} _hover={{bg: 'white', color: 'green'}} onClick={()=>{}}  >Classes</Button>
            <Button variant={'outline'} onClick={()=>{}} borderColor={'#00712D'} _hover={{bg: 'white', color: 'green'}} color={'white'}>Profile</Button>
            {/*  color={currentPath.startsWith('/notes') ? "green" : "white"} */}
            <Button colorScheme="biology" onClick={()=>{}}>Sign Out</Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}