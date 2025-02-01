import React from "react";
import {
  Image,
  Box,
  Flex,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";

interface TestimonialCardProps {
  name: string;
  grade: string;
  date: string;
  avatarUrl: string;
  title: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  grade,
  date,
  avatarUrl,
  title,
  testimonial,
}) => {
  return (
    <Box>
        <Box
            zIndex={5}
            position="relative"
            bg="#6A9381"
            p={6}
            width="328px"
            height="365px"
            maxW="md"
            mx="auto"
            borderTopLeftRadius="2rem"
            borderBottomRightRadius="2rem"
            >
            {/* Header section */}
            <Flex alignItems="center" mb={4}>
            <Image
                src={avatarUrl}
                alt={name}
                boxSize="60px"
                borderRadius="full"
                border="4px solid white"
                objectFit="cover"
                />
                <Box ml={4}>
                <Heading size="md" color="white">
                    {name}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.800">
                    {grade}
                </Text>
                </Box>
            </Flex>

            {/* Testimonial content */}
                <Heading size="sm" color="white" fontWeight="semibold">
                {title}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.900" lineHeight="1.6">
                {testimonial}
                </Text>
                <Text textAlign="right" fontSize="sm" color="whiteAlpha.800">
                {date}
                </Text>
        </Box>
        <Box
            width="342px"
            height="284px"
            bg="#FFA500"
            position="relative"
            mx="auto"
            marginTop="-277px"
            borderTopLeftRadius="2rem"
            borderBottomRightRadius="2rem"
        >
            
        </Box>
    </Box>
  );
};

export default TestimonialCard;
