import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import PlantImage from "../styles/Plant.png";
import Navbar from "@/components/Navbar";

import TelegramGroupCard from "../components/ui/TelegramGroupCard";


const HomePage = () => {
  const navigator = useNavigate();

  return (
    <Box bg="#F0F0F0" minHeight="100vh" >
      {/* Hero Section */}
      <Navbar/>
      <Flex
        w="93%"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        bg="#F9F7F7"
        borderRadius="2.48rem"
        zIndex={1}
        height={{ base: "auto", md: "44.4375rem" }} // Consistent height
        boxSizing="border-box"
        overflow="hidden"
      >
        {/* Left Content */}
        <VStack
          align="start"
          flex="1"
          padding="2.5rem"
          marginBottom={{ base: "2rem", md: "0" }}
        >
          <Heading
            textAlign="left"
            zIndex={2}
            width={{ base: "90%", md: "453px" }} 
            height={{ base: "auto", md: "266px" }} 
            marginLeft="20px"
          >
            <Text
              fontFamily="Bricolage Grotesque" 
              fontWeight="600"
              fontSize="85px" 
              color="#000000"
              lineHeight="90px"
            >
              Discover the Wonder of
            </Text>
            <Text
              fontFamily="Bricolage Grotesque" 
              color="#387259"
              fontWeight="600"
              fontSize="115px"
              lineHeight="120px"
            >
              Biology
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="#000000BF"
            lineHeight="1.5"
            maxW="30rem"
            marginTop="3.5rem"
            marginLeft="20px"
          >
            Interactive lessons and resources to make learning biology engaging and effective.
          </Text>
          <HStack 
          marginTop="3rem"
          marginLeft="20px"
          gap={8}
          >
            <Button
              width={{ base: "10rem", md: "12.46rem" }}
              height="3rem"
              borderRadius="0.817rem"
              background="#FFA500"
              boxShadow="0rem 0.25rem 0.35rem 0rem #0000001C"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <Text fontWeight="bold" fontSize="lg" color="#FFFFFF">
                Start Learning
              </Text>
            </Button>
            <Button
              onClick={() => navigator("/classes")}
              width={{ base: "10rem", md: "12.46rem" }}
              height="3rem"
              borderRadius="0.817rem"
              background="#FFFFFF"
              boxShadow="0rem 0.25rem 0.35rem 0rem #0000001C"
              border="1px solid #00000033"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <Text fontWeight="bold" fontSize="lg" color="#000000">
                Browse Courses
              </Text>
            </Button>
          </HStack>
        </VStack>

        {/* Right Image */}
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image
            src={PlantImage}
            alt="Plant illustration"
            objectFit="cover"
            height="100%"
            width="100%"
            borderBottomRightRadius="2.48rem"
            borderTopRightRadius="2.48rem"
          />
        </Box>
      </Flex>

      {/* Section 2 */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap="1.5rem"
        bg="gray.100"
        padding="2rem"
        maxW="1200px"
        mx="auto"
        mt="2rem"
        borderRadius="1rem"
      >
        {/* Interactive Lessons */}
        <Box
          bg="#387259"
          borderRadius="0.5rem"
          padding="1.5rem"
          textAlign="center"
          boxShadow="0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)"
        >
          <Text color="white" fontSize="2rem" mb="0.5rem">
            📘
          </Text>
          <Text fontSize="1.5rem" fontWeight="bold" color="white">
            100+
          </Text>
          <Text fontSize="1rem" color="white">
            Interactive Lessons
          </Text>
        </Box>

        {/* Virtual Labs */}
        <Box
          bg="#387259"
          borderRadius="0.5rem"
          padding="1.5rem"
          textAlign="center"
          boxShadow="0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)"
        >
          <Text color="white" fontSize="2rem" mb="0.5rem">
            🧪
          </Text>
          <Text fontSize="1.5rem" fontWeight="bold" color="white">
            50+
          </Text>
          <Text fontSize="1rem" color="white">
            Virtual Labs
          </Text>
        </Box>

        {/* Active Students */}
        <Box
          bg="#387259"
          borderRadius="0.5rem"
          padding="1.5rem"
          textAlign="center"
          boxShadow="0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)"
        >
          <Text color="white" fontSize="2rem" mb="0.5rem">
            👥
          </Text>
          <Text fontSize="1.5rem" fontWeight="bold" color="white">
            10,000+
          </Text>
          <Text fontSize="1rem" color="white">
            Active Students
          </Text>
        </Box>
      </SimpleGrid>


      <Box
        position="relative"
        width="100%"
        textAlign="center"
        marginTop="5rem"
        marginBottom={0}
      >
        <Text
          fontFamily="Bricolage Grotesque"
          fontSize={{ base: "1.5rem", md: "2.5rem", lg: "2.75rem" }} 
          fontWeight="600"
          lineHeight={{ base: "2rem", md: "3rem" }} 
          textAlign="center"
          color="#000000"
          width={{ base: "90%", md: "80%", lg: "705px" }} 
          mx="auto"
          marginTop={{ base: "1rem", md: "2rem" }} 
        >
          Join Our Learning Community
        </Text>
        <Text
          fontFamily="Bricolage Grotesque"
          fontSize={{ base: "0.875rem", md: "1.3rem" }}
          fontWeight="400"
          lineHeight={{ base: "1.2rem", md: "1.7rem" }}
          textAlign="center"
          color="#000000"
          width={{ base: "90%", md: "80%", lg: "705px" }}
          mx="auto"
        >
          Connect with fellow students and get instant updates through our Telegram groups
        </Text>
        </Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap="1.5rem"
        padding="2rem"
        maxW="1200px"
        mx="auto"
        mt="2rem"
        borderRadius="1rem"
        justifyItems="center"
      >
        <TelegramGroupCard />
        <TelegramGroupCard />
        <TelegramGroupCard />
      </SimpleGrid>
      <Box
        position="relative"
        width="100%"
        textAlign="center"
        marginTop="5rem"
        marginBottom={0}
      >
          <Box
                bg="#387259"
                // Padding to increase the background area
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="120px"  // Padding to increase the background area
  >
        <Text
          fontFamily="Bricolage Grotesque"
          fontSize="24px"
          fontWeight="400"
          lineHeight={{ base: "2rem", md: "3rem" }} 
          textAlign="center"
          color="white"
          mx="auto"
          my="20px"
          bg="#387259"
          marginTop={{ base: "1rem", md: "2rem" }} 
        >
          
          2024 Dopamine Lite - All rights reserved 
        </Text>
        </Box>
        </Box>
    </Box>
  );
};

export default HomePage;
