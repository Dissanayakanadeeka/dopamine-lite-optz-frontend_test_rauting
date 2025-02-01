import React, { useState, useEffect } from 'react';
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
  Button,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
  Stack,
  Textarea,
  DialogRoot,
  DialogTrigger,
  DialogBackdrop
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { FaCalendarAlt, FaUserAlt, FaBook, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { lessonsService, lessonsService_dev } from "@/services/lessons";
import { Lesson } from '@/types/lesson.types';
import { useNavigate, useParams } from 'react-router-dom';

const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F",
  background: "#FFFBE6",
  accent: "#FF9100",
};

const AdminLessonsPage = () => {
  const params = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lesson: '',
    tutor: '',
    handler: ''
  });
  const classId = params.clsid;
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, [params.clsid]);

  const fetchLessons = async () => {
    const data = await lessonsService_dev.getLessonsByClassId(params.clsid!);
    setLessons(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedLesson) {
        await lessonsService.updateLesson(classId!, selectedLesson.id, formData);
        toaster.create({ title: 'Lesson updated successfully', type: 'success' });
      } else {
        await lessonsService_dev.createLesson({
          ...formData, classId: params.clsid!,
          date: ''
        });
        toaster.create({ title: 'Lesson created successfully', type: 'success' });
      }
      setIsDialogOpen(false);
      setSelectedLesson(null);
      setFormData({ title: '', description: '', lesson: '', tutor: '', handler: '' });
      fetchLessons();
    } catch (error) {
      toaster.create({ title: 'Error saving lesson', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await lessonsService.deleteLesson(classId!, id);
        toaster.create({ title: 'Lesson deleted successfully', type: 'success' });
        fetchLessons();
      } catch (error) {
        toaster.create({ title: 'Error deleting lesson', type: 'error' });
      }
    }
  };

  const handleEditClick = (lessonId: string) => {
    navigate(`/admin/classes/${classId}/lessons/${lessonId}/edit`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <DialogRoot modal placement={"top"} open={isDialogOpen} >
        <DialogBackdrop />
        <DialogContent >
          <DialogHeader>
            {selectedLesson ? 'Edit Lesson' : 'Add New Lesson'}
          </DialogHeader>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog  </Button>
          </DialogTrigger>
          <DialogBody>
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Box>
                  <Text mb={2} fontWeight="medium">Lesson Number</Text>
                  <Input
                    placeholder="e.g., 1"
                    value={formData.lesson}
                    onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
                    required
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">Title</Text>
                  <Input
                    placeholder="e.g., Introduction to Algebra"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">Description</Text>
                  <Textarea
                    placeholder="Enter a brief description of the lesson"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">Handler</Text>
                  <Input
                    placeholder="video handler"
                    value={formData.tutor}
                    onChange={(e) => setFormData({ ...formData, handler: e.target.value })}
                    required
                  />
                </Box>

                <Box>
                  <Text mb={2} fontWeight="medium">Tutor</Text>
                  <Input
                    placeholder="e.g., Dr. John Smith"
                    value={formData.handler}
                    onChange={(e) => setFormData({ ...formData, handler: e.target.value })}
                    required
                  />
                </Box>
              </Stack>
              <DialogFooter>
                <Button
                  mr={3}
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedLesson(null);
                    setFormData({ title: '', description: '', lesson: '', tutor: '', handler: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" colorScheme="green" bg={colors.primary}>
                  {selectedLesson ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      <Box bg={colors.background} minH="100vh" py={8}>

        <Container maxW="container.xl">
          <VStack gap={8} align="stretch">
            <Box textAlign="center" mb={8}>
              <HStack justify="space-between" align="center">
                <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} color={colors.primary}>
                  Manage Lessons
                </Heading>
                <Button onClick={() => {
                  navigate(`/admin/classes/${classId}/lessons/create`);
                }} colorScheme="green" bg={colors.primary}>
                  <Icon mr={2} >
                    <FaPlus />
                  </Icon>
                  Add Lesson
                </Button>
              </HStack>
            </Box>


            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {lessons.map((lesson) => (
                <Card.Root
                  key={lesson.id}
                  overflow="hidden"
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
                      <Badge colorScheme="green" bg={colors.secondary} color={colors.primary} px={3} py={1} borderRadius="full">
                        <HStack gap={1}>
                          <Icon boxSize={3} >
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
                          <Icon color={colors.accent} >
                            <FaCalendarAlt />
                          </Icon>
                          <Text>Created: {formatDate(lesson.createdAt)}</Text>
                        </HStack>
                        <HStack fontSize="sm" color="gray.600">
                          <Icon color={colors.accent} >
                            <FaUserAlt />
                          </Icon>
                          <Text>Handler: {lesson.handler}</Text>
                        </HStack>
                      </VStack>

                      <HStack justify="flex-end" w="full" gap={2}>
                        <IconButton
                          aria-label="Edit lesson"
                          onClick={() => handleEditClick(lesson.id)}
                          colorScheme="blue"
                          variant="ghost"
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          aria-label="Delete lesson"
                          onClick={() => handleDelete(lesson.id)}
                          colorScheme="red"
                          variant="ghost"
                        >
                          <FaTrash />
                        </IconButton>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card.Root>
              ))}
            </SimpleGrid>

          </VStack>


        </Container>
      </Box>
    </>
  );
};

export default AdminLessonsPage;