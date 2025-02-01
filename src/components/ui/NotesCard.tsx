import React from "react";
import { Box, Text, Button, Icon, Flex, ButtonProps } from "@chakra-ui/react";
import { FaDownload, FaRegFileAlt, FaCalendarAlt, FaFile } from "react-icons/fa";

// Updated NotesCard to accept props
const NotesCard = ({ title, description, fileName, size, uploadDate, fileUrl }) => {
  // Function to trigger file download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl; // Use the passed file URL
    link.download = fileName; // Download the specific file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      maxW="22.875rem"
      h="17.3125rem"
      p={4}
      borderRadius="0.9375rem"
      boxShadow="0px 0.25rem 0.5rem rgba(0, 0, 0, 0.2)"
      border="0.125rem solid transparent"
      _hover={{ borderColor: "blue.400" }}
      bg="#6A9381"
      color="white.20"
      fontFamily="Arial, sans-serif"
    >
      {/* Title */}
      <Text fontSize="1.375rem" mt={2} fontWeight="bold">
        {title} {/* Display dynamic title */}
      </Text>
      <Text fontSize="0.8125rem" mt={1} fontWeight="300" color="gray.200">
        {description} {/* Display dynamic description */}
      </Text>

      <Text fontSize="0.8125rem" mt={4} opacity={0.9} color="gray.200">
        _____________________________________________
      </Text>

      {/* File Details */}
      <Flex align="center" gap={6} fontSize="sm" mt={5}>
        <Flex align="center" gap={1}>
          <Icon as={FaCalendarAlt} />
          <Text fontSize="0.75rem" color="gray.300">{uploadDate}</Text> {/* Display dynamic upload date */}
        </Flex>
        <Flex align="center" gap={1}>
          <Icon as={FaRegFileAlt} />
          <Text fontSize="0.75rem" color="gray.300">{fileName}</Text> {/* Display dynamic file name */}
        </Flex>
        <Flex align="center" gap={1}>
          <Icon as={FaFile} />
          <Text fontSize="0.75rem"  color="gray.300">{size}</Text> {/* Display dynamic file size */}
        </Flex>
      </Flex>

      {/* Download Button */}
      <Button
        mt={8}
        width="19.9375rem" // 319px = 19.9375rem
        height="3.0625rem" // 49px = 3.0625rem
        color="white"
        fontSize="1.25rem" 
        variant="outline"
        borderRadius="0.5rem"
        borderWidth="0.125rem"
        borderColor="#FFFFFF"
        _hover={{ bg: "whiteAlpha.300" }}
        onClick={handleDownload} // Now downloads the specific file
      >
        <Icon as={FaDownload} />
        Download PDF
      </Button>
    </Box>
  );
};

export default NotesCard;
