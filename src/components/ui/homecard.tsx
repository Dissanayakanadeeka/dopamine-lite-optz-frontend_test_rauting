import { Box, Image, Text, VStack } from "@chakra-ui/react";

// Renaming Card to Hcard
interface HcardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Hcard: React.FC<HcardProps> = ({ title, description, imageUrl }) => {
  return (
    <Box
      bg="white"
      borderRadius="1rem"
      boxShadow="0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)"
      width={{ base: "18rem", md: "22rem", lg: "350px" }} // Adjust width for better responsiveness
      height={{ base: "18rem", md: "22rem", lg: "300px" }} // Adjust height for responsiveness
      textAlign="center"
      overflow="hidden"
      position="relative"
    >
      {/* Icon/Image */}
      <Box p="2rem">
        <Image
          src={imageUrl}
          alt={`${title} Icon`}
          mx="auto"
          width="100px"
          height="100px"
        />
      </Box>
    
      {/* Text Content */}
      <VStack spacing="1rem" align="center" px={{ base: "1rem", md: "2rem" }}>
        <Text
          fontFamily="Bricolage Grotesque"
          fontWeight="600"
          fontSize={{ base: "1.25rem", md: "1.75rem" }} // Font size scaling for responsiveness
          color="#000000"
          lineHeight="1.2"
        >
          {title}
        </Text>
        <Text
          fontFamily="Bricolage Grotesque"
          fontWeight="500"
          fontSize={{ base: "1rem", md: "1.125rem" }} // Font size scaling for responsiveness
          lineHeight="1.5"
          color="#000000BF"
          width={{ base: "80%", md: "260px" }} // Adjusted width for responsiveness
          mx="auto"
        >
          {description}
        </Text>
      </VStack>
    
      {/* Bottom Bar */}
      <Box
        bg="#FFA500"
        height="0.75rem"
        width="100%"
        position="absolute"
        bottom="0"
        left="0"
      />
    </Box>
  );
};

export default Hcard;
