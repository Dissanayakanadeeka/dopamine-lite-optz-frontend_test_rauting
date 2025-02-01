import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Button,
  Input,
  Textarea,
  Text,
  HStack,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection
} from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsService_dev } from "@/services/lessons";
import { accessGroupService_dev } from "@/services/access-groupes";
import { toaster } from "@/components/ui/toaster";
import { AccessGroup } from '@/types/access-group.types';
import { belongingLessons } from '@/assets/static/belongingLessons';


const colors = {
  primary: "#00712D",
  background: "#FFFBE6",
};

export default function AdminCreateLessonPage() {
  const { clsid } = useParams();
  const navigate = useNavigate();
  // const [accessGroups, setAccessGroups] = useState<AccessGroup[]>([]);
  const [accessGroupsList, setAccessGroupsList] = useState<{ label: string; value: string }[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lesson: '',
    tutor: '',
    handler: '',
    accessGroupId: ''
  });

  useEffect(() => {
    const fetchAccessGroups = async () => {
      try {
        const groups = await accessGroupService_dev.getGroups();
        // setAccessGroups(groups);
        processAccessGroups(groups);
        // No default selection
      } catch (error) {
        toaster.create({ title: 'Error fetching access groups', type: 'error' });
      }
    };

    fetchAccessGroups();
  }, []);

  const processAccessGroups = (groups: AccessGroup[]) => {
    const processedGroups = groups.map(group => ({
      label: group.name,
      value: group.id,
    }));
    setAccessGroupsList(processedGroups);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    try {
      await lessonsService_dev.createLesson({
        ...formData,
        classId: clsid!,
        date: new Date().toISOString()
      });
      toaster.create({ title: 'Lesson created successfully', type: 'success' });
      navigate(`/admin/classes/${clsid}/lessons`);
    } catch (error) {
      toaster.create({ title: 'Error creating lesson', type: 'error' });
    }
  };

  return (
    <Box bg={colors.background} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack gap={8} align="stretch">
          <Heading color={colors.primary}>Create New Lesson</Heading>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>

              <Box w="full">
                <Text color={colors.primary} mb={2}>Title</Text>
                <Input
                  color='black'
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Description</Text>
                <Textarea
                  color='black'
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Box>

              <Box w="full">
                <Text color={colors.primary} mb={2}>Handler</Text>
                <Input
                  color='black'
                  value={formData.handler}
                  onChange={(e) => setFormData({ ...formData, handler: e.target.value })}
                  required
                />
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Tutor</Text>
                <Input
                  color='black'
                  value={formData.tutor}
                  onChange={(e) => setFormData({ ...formData, tutor: e.target.value })}
                  required
                />
              </Box>
              <Box w="full">
                <Text mb={2} color={colors.primary}>Belonging lesson</Text>
                <SelectRoot color={colors.primary} collection={createListCollection({ items: belongingLessons })} required>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select a belonging lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {(createListCollection({ items: belongingLessons })).items.map(eachLesson => {
                      return (
                        <SelectItem key={eachLesson.value} item={eachLesson}>
                          {eachLesson.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </SelectRoot>
              </Box>
              <Box w="full">
                <Text color={colors.primary} mb={2}>Access Group</Text>
                <SelectRoot
                  color={colors.primary}
                  collection={createListCollection({ items: accessGroupsList })}
                  // onChange={(e) => setFormData({ ...formData, accessGroupId: (e.target as HTMLSelectElement).value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select an access group" />
                  </SelectTrigger>

                  <SelectContent>
                    {(createListCollection({ items: accessGroupsList })).items.map(group => (
                      <SelectItem key={group.value} item={group}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </SelectRoot>
              </Box>
              <HStack justify="flex-end" w="full">
                <Button onClick={() => navigate(-1)} mr={3}>Cancel</Button>
                <Button type="submit" bg={colors.primary} color="white">
                  Create Lesson
                </Button>
              </HStack>
            </VStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}