import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Skeleton,
  Icon,
  Separator,
  Card,
  CardBody,
} from '@chakra-ui/react';
import {
  FaRegClock,
  FaRegCalendarAlt,
  FaChalkboardTeacher,
  FaBookReader,
  FaInfoCircle
} from 'react-icons/fa';
import VideoPlayer from '@/components/VideoPlayer';
import { lessonsService_dev } from '@/services/lessons';
import { Lesson } from '@/types/lesson.types';
import SideDrawer from '@/components/SideDrawer';
import {DopamineLiteColors} from '@/themes/colors';
import { color } from 'framer-motion';

const Light = DopamineLiteColors;





const LessonPage = () => {
  const params = useParams();
  const [lessonData, setLessonData] = useState<Lesson>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setIsLoading(true);
        const data = await lessonsService_dev.getLesson(params.clsid!, params.id!);
        setLessonData(data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonData();
  }, [params.clsid, params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Video URL (you might want to make this dynamic based on lesson data)
  const url = 'https://us-central1-dopamine-lite-b61bf.cloudfunctions.net/getPresignedUrl?manifest_key=index.m3u8&segment_keys=index0.ts,index1.ts&folder=kana&expiration=3600';

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          <Skeleton height="2.5rem" width="70%" />
          <Skeleton height="1.5rem" width="40%" />
          <Skeleton height="25rem" borderRadius="lg" />
          <Skeleton height="6rem" />
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={Light.backgroundWhite} minH="100vh">
    <Container maxW="container.xl" px={{ base: "1rem", md: "2rem" }}>
      <HStack spacing={{ base: "1rem", md: "2rem" }} align="start" flexWrap="wrap">
        <Box mt="1.5rem">
          <SideDrawer classId={lessonData?.classId} />
        </Box>
        <VStack align="stretch" gap={6} mb={8} w="full">
          <Heading as="h1" size="xl" color={Light.black100}>
            {lessonData?.title}
          </Heading>
          <HStack gap={8} flexWrap="wrap" color="gray.600">
            <HStack>
              <Icon as={FaRegCalendarAlt} color={Light.black100} />
              <Text fontSize="0.875rem" color={Light.black75}>Created:</Text>
              <Text fontSize="0.875rem" color={Light.black100}>{formatDate(lessonData?.createdAt || '')}</Text>
            </HStack>
            <HStack>
              <Icon as={FaChalkboardTeacher} color={Light.black100} />
              <Text fontSize="0.875rem" color={Light.black75}>Handler:</Text>
              <Text fontSize="0.875rem" color={Light.black100}>{lessonData?.handler}</Text>
            </HStack>
          </HStack>
          <Card.Root shadow="sm" borderRadius="1rem" overflow="hidden" w="full">
            <Box aspectRatio={16 / 9}>
              <VideoPlayer url={url} watermark="Dopamine lite" />
            </Box>
          </Card.Root>
          <HStack justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" p={4} mt={3}>
            <HStack align="flex-start" maxW={{ base: "100%", md: "60%" }}>
              <Icon as={FaInfoCircle} color={Light.black100} boxSize={5} mt="0.5rem" />
              <VStack align="stretch">
                <Text fontSize="1.125rem" color={Light.black100}>About this lesson</Text>
                <Text fontSize="0.9375rem" color={Light.black75}>{lessonData?.description}</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" maxW={{ base: "100%", md: "40%" }}>
              <Icon as={FaRegClock} color={Light.black100} boxSize={5} mt="0.5rem" />
              <VStack align="stretch" textAlign={{ base: "left", md: "right" }}>
                <Text fontSize="1.125rem" color={Light.black100}>Last Updated</Text>
                <Text fontSize="0.9375rem" color={Light.black75}>{formatDate(lessonData?.updatedAt || '')}</Text>
              </VStack>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Container>
  </Box>
  );
};



export default LessonPage;