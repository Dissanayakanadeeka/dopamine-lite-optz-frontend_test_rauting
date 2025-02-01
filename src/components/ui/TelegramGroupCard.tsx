import React from "react";
import { Box, Text, Button, Icon, VStack, Flex } from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";

const TelegramGroupCard = () => {
  const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  return (
    <Box
      maxW="21.25rem" 
      h="20rem"
      borderRadius="2.5rem" 
      overflow="hidden"
      boxShadow="0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)" 
      p="0.25rem"
      textAlign="center"
      bg="white"
      fontFamily={fontFamily}
      justifyContent="space-between" 
    >
      <VStack 
        pt={14}
        pb={14}
      >
        <Flex alignItems="center" width="100%" justifyContent="center">
          <Box
            bg="blue.400"
            w="4.375rem" 
            h="4.375rem" 
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            mr="0.25rem" 
          >
            <Icon as={FaTelegramPlane} color="white" w="2rem" h="2rem" />
          </Box>
          <VStack alignItems="flex-start"> {/* Align text to the left */}
            <Text fontSize="1.25rem" fontWeight="bold" color="black" fontFamily={fontFamily}> 
              2026 Theory Class
            </Text>
            <Text fontSize="0.75rem" color="gray.600" mt={-3}> {/* Negative margin */} 
              Telegram Group
            </Text>
            <Text fontSize="1rem" color="gray.600" mt={-1}> {/* Negative margin */} 
              2345 members
            </Text>
          </VStack>
        </Flex>
        <Text fontSize="0.875rem" color="gray.300" textAlign="center" mt="-0.25rem" fontWeight="bold"> 
          ________________________________________________
        </Text>
        <Text fontSize="1rem" color="black" textAlign="center" mt="0.0625rem">
          Join for daily updates and discussions on theory topics
        </Text>
        <Button color="white" size="md" fontSize="1.125rem" width="100%" bg="#387259" height="2.625rem" maxWidth="9.125rem" borderRadius="2.5rem" mt="0.1875rem"> 
          Join Group
        </Button>
      </VStack>
    </Box>
  );
};

export default TelegramGroupCard;
