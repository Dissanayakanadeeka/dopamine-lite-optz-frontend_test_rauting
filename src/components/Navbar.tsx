import { 
  Box, 
  Flex, 
  Button, 
  Stack, 
  Image, 
  Text, 
  Link,
  useDisclosure,
  VStack,
  MenuRoot,
  MenuTrigger,
  MenuContent
} from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAppDispatch } from '../hooks/redux';
import { clearUser } from '../state/slices/userSlice';
import { signOut } from '@aws-amplify/auth';
import dopamineLogo from '@/assets/dopamine_logo.jpg';
import { useNavigate } from 'react-router-dom';
import { DopamineLiteColors } from '@/themes/colors';
import { forwardRef, ForwardedRef } from 'react';

const NavbarLink = forwardRef(({ onClick, children, ...props }: any, ref: ForwardedRef<HTMLAnchorElement>) => (
  <Link ref={ref} onClick={onClick} {...props}>
    {children}
  </Link>
));

NavbarLink.displayName = 'NavbarLink';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { open, onClose } = useDisclosure();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(clearUser());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const onHomeClick = () => {
    navigate('/');
    onClose();
  };

  const onClassesClick = () => {
    navigate('/classes');
    onClose();
  };
  const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  const NavButtons = () => (
    <>
      <Button 
        variant="link"
        color="#000000" // Black color
        fontWeight="400" // Font weight
        fontSize="20px" // Font size
        lineHeight="24px" // Line height
        fontFamily={fontFamily} // Use consistent font family
        onClick={onClassesClick}
        

      >
        Classes
      </Button>
      <Button 
        variant="link"
        onClick={()=>{}} 
        color="#000000"
        fontWeight="400"
        fontSize="20px"
        lineHeight="24px"
        fontFamily={fontFamily} // Use consistent font family
      >
        Profile
      </Button>
      <Button 
      colorScheme="biology" 
      onClick={handleSignOut}
      bg="white"
      color="#000000"
      boxShadow="0px 3px 2px rgba(0, 0, 0, 0.1)"
      borderRadius="8px"
      fontWeight="400"
      fontSize="20px"
      lineHeight="24px"
      fontFamily={fontFamily} // Use consistent font family
      px={6}
      py={4}
      _hover={{ bg: "gray.200" }}
      
    >
        Sign Out
      </Button>
    </>
  );

  return (
    <Box 
    bg="#F0F0F0" // Light gray background color
    position="sticky" 
    top="0" 
    w="100%" 
    border="none" // Explicitly remove any border
    boxShadow="none" // Remove box shadow if it's there
    zIndex="50"
  >
      <Flex h={16} alignItems="center" justifyContent="space-between" px={4}>
      <Flex flex="1" >
        <NavbarLink onClick={onHomeClick}>
          <Flex alignItems="center">
            <Text
            fontSize="xl"
            fontWeight="bold"
            color="black"
            fontFamily={fontFamily} // Use consistent font family
            ml = {10}
            zIndex="50"
          >
              Dopamine Lite
            </Text>
          </Flex>
        </NavbarLink>
        </Flex>

        {/* Desktop Navigation */}
        <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
          <Stack direction="row" gap={7}>
            <NavButtons />
          </Stack>
        </Flex>

        {/* Mobile Navigation */}

        <Box display={{ base: 'flex', md: 'none' }}>
          <MenuRoot>
            <MenuTrigger>
              <Button>
                {open ? <FiMenu /> : <FiX />}
              </Button>
              {/* <IconButton
                aria-label="Open menu"
                display={{ base: 'flex', md: 'none' }}
                variant="outline"
                colorScheme="whiteAlpha"
              >
{open ? <FiMenu /> : <FiX />}
              </IconButton> */}
            </MenuTrigger>
            <MenuContent>
              <VStack gap={4} align="stretch" mt={4}>
                <NavButtons />
              </VStack>
            </MenuContent>
          </MenuRoot>
        </Box>
        {/* <IconButton
          aria-label="Open menu"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          colorScheme="whiteAlpha"
        >
          {open ? <FiX /> : <FiMenu />}
          </IconButton>

        <Drawer.Root open={open} placement="end">
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerHeader bg={DopamineLiteColors.greenColor} color="white">
              Menu
            </DrawerHeader>
            <DrawerBody bg={DopamineLiteColors.greenColor}>
              <VStack gap={4} align="stretch" mt={4}>
                <NavButtons />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer.Root> */}
      </Flex>
    </Box>
  );
}