import React, { useState, useEffect } from 'react';
import { Box, Container, VStack, Heading, Button, Input, Textarea, Text, HStack} from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsService, lessonsService_dev } from "@/services/lessons";
import { toaster } from "@/components/ui/toaster";

const colors = {
  primary: "#00712D",
  background: "#FFFBE6",
};

export default function AdminEditLessonPage() {
  const { lessonid, clsid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lesson: '',
    tutor: '',
    handler: ''
  });

  console.log("Lesson ID: ", lessonid);
  console.log("Class ID: ", clsid);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lesson = await lessonsService_dev.getLesson(clsid!, lessonid!);
        console.log("Lesson: ", lesson);
        setFormData({
          title: lesson.title,
          description: lesson.description,
          lesson: lesson.lesson,
          tutor: lesson.tutor,
          handler: lesson.handler
        });
      } catch (error) {
        toaster.create({ title: 'Error fetching lesson', type: 'error' });
      }
    };
    fetchLesson();
  }, [lessonid, clsid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    try {
      await lessonsService.updateLesson(clsid!, lessonid!, formData);
      toaster.create({ title: 'Lesson updated successfully', type: 'success' });
      navigate(`/admin/classes/${clsid}/lessons`);
    } catch (error) {
      toaster.create({ title: 'Error updating lesson', type: 'error' });
    }
  };

  return (
    
    <Box bg={colors.background} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack gap={8} align="stretch">
          <Heading color={colors.primary}>Edit Lesson</Heading>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Box w="full">
                <Text mb={2} color={colors.primary}>Belonging lesson</Text>
                <Input
                color='black'
                  value={formData.lesson}
                  onChange={(e) => setFormData({...formData, lesson: e.target.value})}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Title</Text>
                <Input
                color='black'
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Description</Text>
                <Textarea
                color='black'
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Handler</Text>
                <Input
                color='black'
                  value={formData.handler}
                  onChange={(e) => setFormData({...formData, handler: e.target.value})}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Tutor</Text>
                <Input
                color='black'
                  value={formData.tutor}
                  onChange={(e) => setFormData({...formData, tutor: e.target.value})}
                  required
                />
              </Box>
              <HStack justify="flex-end" w="full">
                <Button onClick={() => navigate(-1)} mr={3}>Cancel</Button>
                <Button  type="submit" bg={colors.primary} color="white">
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}