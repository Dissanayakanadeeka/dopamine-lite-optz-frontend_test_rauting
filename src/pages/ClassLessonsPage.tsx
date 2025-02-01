import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  Image,
  Badge,
  HStack,
  Icon,
  Skeleton,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Class } from '@/types/class.types';
import { useEffect, useState } from 'react';
import { classesService_dev } from '@/services/classes';
import { lessonsService_dev } from '@/services/lessons';
import { Lesson } from '@/types/lesson.types';
import { FaCalendarAlt, FaUserAlt, FaBook } from 'react-icons/fa';
import SideDrawer from '@/components/SideDrawer';

// Color palette
const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F",
  background: "#FFFBE6",
  accent: "#FF9100",
};


export default function LessonsPage() {
  const params: Record<string, string | undefined> = useParams();
  const [classData, setClassData] = useState<Class>();
  const [classLessons, setClassLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await classesService_dev.getClassById(params.clsid!);
        setClassData(data);
        const lessons = await lessonsService_dev.getLessonsByClassId(data.id);
        setClassLessons(lessons);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.clsid]);

  const handleOnClick = (lesson: Lesson) => {
    const urlTitle = lesson.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`${lesson.id}/${urlTitle}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Flex minH="100vh">
     

      {/* Main Content */}
      <Box zIndex={0} flex="1" bg={colors.background} py={8} px={6} position={'relative'}>
        <SideDrawer classId={classData?.id} />
        <Container maxW="container.xl">
          <VStack gap={8} align="stretch">
            <Box textAlign="center" mb={8}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl" }}
                color={colors.primary}
                mb={4}
              >
                Available Lessons
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Select a lesson to start learning
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, index) => (
                  <Card.Root key={index} borderRadius="lg" overflow="hidden" boxShadow="md">
                    <Skeleton height="200px" />
                    <CardBody>
                      <VStack align="start" gap={4}>
                        <Skeleton height="20px" width="40%" />
                        <Skeleton height="24px" width="100%" />
                        <Skeleton height="20px" width="60%" />
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))
              ) : (
                classLessons.map((lesson) => (
                  <Card.Root
                    key={lesson.id}
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => handleOnClick(lesson)}
                    borderRadius="lg"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "lg",
                      borderColor: colors.primary,
                    }}
                    borderWidth="1px"
                    borderColor="gray.100"
                  >
                    <Image
                      src={'/api/placeholder/400/200'}
                      alt={lesson.title}
                      height="200px"
                      objectFit="cover"
                    />
                    <CardBody>
                      <VStack align="start" gap={4}>
                        <Badge
                          colorScheme="green"
                          bg={colors.secondary}
                          color={colors.primary}
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          <HStack gap={1}>
                            <Icon  boxSize={3} >
                              <FaBook />
                            </Icon>
                            <Text>Lesson {lesson.lesson}</Text>
                          </HStack>
                        </Badge>

                        <Heading size="md" color={colors.primary}>
                          {lesson.title}
                        </Heading>

                        <Text color="gray.600" fontSize="sm">
                          {lesson.description}
                        </Text>

                        <VStack gap={2} align="start" w="full">
                          <HStack fontSize="sm" color="gray.600">
                            <Icon  color={colors.accent} >
                              <FaCalendarAlt />
                            </Icon>
                            <Text>Created: {formatDate(lesson.createdAt)}</Text>
                          </HStack>
                          <HStack fontSize="sm" color="gray.600">
                            <Icon  color={colors.accent} >
                              <FaUserAlt />
                            </Icon>
                            <Text>Handler: {lesson.handler}</Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card.Root>
                ))
              )}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}