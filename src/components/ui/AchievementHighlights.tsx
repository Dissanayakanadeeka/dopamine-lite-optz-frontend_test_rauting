import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import Background from "../../styles/StatisticsComponent_background.png";
import graduation from "../../styles/StatisticsComponent_grajuation.png";
import teaching from "../../styles/StatisticsComponent_teaching.png";
import star from "../../styles/StatisticsComponent_five_star.png";
import grade from "../../styles/StatisticsComponent_grades.png";

const HomeStatisticsComponent = () => {
  return (
    <Box
      bg={`linear-gradient(rgba(50, 85, 65, 0.64), rgba(50, 85, 65, 0.64)), url(${Background})`}
      bgSize="cover"
      backgroundPosition="center -100px"
      py={5}  // Adjust padding to a positive value for better layout
      px={4}
    >
      <Flex 
        justify="center" 
        align="center" 
        gap={8} 
        wrap="wrap"
        mx="auto"
        maxW="1200px"
      >
        {/* Statistic 1 */}
        <VStack
            bg="rgba(255, 255, 255, 0.15)"
            borderRadius="80px"
            p={10} // Increased padding
            textAlign="center"
            backdropFilter="blur(10px)"
            my={10}
            mx={8}
            width="160px" // Increased width
            border="1px solid white"
            >
            <Image
                src={graduation}
                alt="Teaching Icon"
                boxSize="70px" // Increased box size
                mb={2} // Increased margin below the image
            />
            <Text
                fontSize="3xl"
                fontWeight="bold"
                color="white"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
            >
                15+
            </Text>
            <Text
                fontSize="20px"
                color="whiteAlpha.800"
                maxW="160px"
                mx="auto"
                lineHeight="1.2"
                textAlign="center"
            >
                Years <br /> Teaching
            </Text>
        </VStack>

        {/* Statistic 2 */}
        <VStack
            bg="rgba(255, 255, 255, 0.15)"
            borderRadius="80px"
            p={10} // Increased padding
            textAlign="center"
            backdropFilter="blur(10px)"
            my={10}
            mx={8}
            width="160px" // Increased width
            border="1px solid white"
            >
            <Image
                src={teaching}
                alt="Teaching Icon"
                boxSize="70px" // Increased box size
                mb={2} // Increased margin below the image
            />
            <Text
                fontSize="3xl"
                fontWeight="bold"
                color="white"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
            >
                5,000+
            </Text>
            <Text
                fontSize="20px"
                color="whiteAlpha.800"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
                textAlign="center"
            >
                Students <br />Taught
            </Text>
        </VStack>

        {/* Statistic 3 */}
        <VStack
            bg="rgba(255, 255, 255, 0.15)"
            borderRadius="80px"
            p={10} // Increased padding
            textAlign="center"
            backdropFilter="blur(10px)"
            my={10}
            mx={8}
            width="160px" // Increased width
            border="1px solid white"
            >
            <Image
                src={star}
                alt="Teaching Icon"
                boxSize="70px" // Increased box size
                mb={2} // Increased margin below the image
            />
            <Text
                fontSize="3xl"
                fontWeight="bold"
                color="white"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
            >
                98%
            </Text>
            <Text
                fontSize="20px"
                color="whiteAlpha.800"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
                textAlign="center"
            >
                Success <br />Rate
            </Text>
        </VStack>

        {/* Statistic 4 */}
        <VStack
            bg="rgba(255, 255, 255, 0.15)"
            borderRadius="80px"
            p={10} // Increased padding
            textAlign="center"
            backdropFilter="blur(10px)"
            my={10}
            mx={8}
            width="160px" // Increased width
            border="1px solid white"
            >
            <Image
                src={grade}
                alt="Teaching Icon"
                boxSize="70px" // Increased box size
                mb={2} // Increased margin below the image
            />
            <Text
                fontSize="3xl"
                fontWeight="bold"
                color="white"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
            >
                200+
            </Text>
            <Text
                fontSize="20px"
                color="whiteAlpha.800"
                maxW="180px"
                mx="auto"
                lineHeight="1.2"
                textAlign="center"
            >
                A <br />Grade
            </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HomeStatisticsComponent;