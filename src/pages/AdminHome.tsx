import { Box, Container, SimpleGrid, VStack, Heading, Text, Icon, Card } from "@chakra-ui/react";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F", 
  background: "#FFFBE6",
  accent: "#FF9100"
};

export default function AdminHomePage() {
  const navigate = useNavigate();

  

  return (
    <Box bg={colors.background} minH="100vh" py={16}>
      <Container maxW="container.lg">
        <VStack gap={12}>
          <Heading color={colors.primary} size="2xl">Admin Dashboard</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
  
              <Card.Root
                key={"Manage Classes"}
                p={8}
                cursor="pointer"
                onClick={() => navigate('/admin/classes')}
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg"
                }}
              >
                <VStack gap={6} align="center">
                  <Icon  boxSize={12} color={colors.primary}>
                    <FaGraduationCap />
                  </Icon>
                  <VStack gap={2} align="center">
                    <Heading size="lg" color={colors.primary}>Manage Classes</Heading>
                    <Text textAlign="center" color="gray.600">Create and manage classes, lessons and course content</Text>
                  </VStack>
                </VStack>
              </Card.Root>

               <Card.Root
                key={"Access Groups"}
                p={8}
                cursor="pointer"
                onClick={() => navigate('/admin/access-groups')}
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg"
                }}
              >
                <VStack gap={6} align="center">
                  <Icon  boxSize={12} color={colors.primary}>
                    <FaUsers />
                  </Icon>
                  <VStack gap={2} align="center">
                    <Heading size="lg" color={colors.primary}>Access Groups</Heading>
                    <Text textAlign="center" color="gray.600">Create and manage classes, lessons and course content</Text>
                  </VStack>
                </VStack>
              </Card.Root>
         
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
