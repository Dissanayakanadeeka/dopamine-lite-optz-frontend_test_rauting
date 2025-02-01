import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Icon,
  Button,
  HStack,
  Tag,
} from "@chakra-ui/react";
import Class1Image from "../styles/class1.png"
import { useNavigate } from "react-router-dom";
import { classesService_dev } from "@/services/classes";
import { useEffect, useState } from "react";
import { Class } from "@/types/class.types";
import { FaGraduationCap, FaArrowRight, FaCalculator } from "react-icons/fa";
import { Divider } from "@aws-amplify/ui-react";

// Color palette
const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F",
  background: "#FFFBE6",
  accent: "#FF9100",
};

const getClases = classesService_dev.getClasses;

const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClases().then((data) => setClasses(data));
  }, []);

  const onClickHandler = (cls: Class) => {
    console.log(`The class ${cls.name} was clicked`);
    navigate(`/classes/${cls.id}/lessons`);
  };

  return (
    <Box bg="#F0F0F0" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              color={colors.primary}
              mb={4}
            >
              Your Learning Journey
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Select a class to begin your learning experience
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {classes.map((cls) => (
              <Card.Root
                key={cls.id}
                onClick={() => onClickHandler(cls)}
                cursor="pointer"
                bg="white"
                borderRadius="40px"
                overflow="hidden"
                borderWidth="2px"
                borderColor="green.500"
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{
                  transform: "scale(1.02)",
                  boxShadow: "md",
                }}
              >
                <CardBody p={6}>
                  <VStack align="stretch" gap={4}>
                    {/* Icon + Class ID + Class Name */}
                    <HStack align="center" justify="flex-start" gap={4}>
                      <Icon as={FaCalculator} boxSize={8} color="green.600" />
                      <VStack align="start" gap={1}>
                        <Text fontSize="18px" fontWeight="400" color="#000000B2">
                          Class ID: {cls.id}
                        </Text>
                        <Text fontSize="24px" fontWeight="500" color="#000000">
                          {cls.name}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Divider */}
                    <Divider borderColor="gray.200" />

                    {/* View Lesson Button */}
                    <Button
                      colorScheme="green"
                      variant="solid"
                      borderRadius="20px"
                      size="sm"
                      alignSelf="center"
                    >
                      View Lesson
                    </Button>
                  </VStack>
                </CardBody>
              </Card.Root>
            ))}
          </SimpleGrid>



        </VStack>
      </Container>
    </Box>
  );
};

export default ClassesPage;