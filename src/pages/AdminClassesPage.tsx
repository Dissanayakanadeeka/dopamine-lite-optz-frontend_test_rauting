import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Card,
  CardBody,
  Icon,
  HStack,
  Button,
  Dialog,

  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,

  Input,
  IconButton,
  Stack
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Tag } from "@/components/ui/tag"
import { FaGraduationCap, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { classesService, classesService_dev } from "@/services/classes";
import { Class } from '@/types/class.types';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F",
  background: "#FFFBE6",
  accent: "#FF9100",
};

const AdminClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>();
  const [formData, setFormData] = useState({ name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const data = await classesService_dev.getClasses();
    setClasses(data);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (selectedClass) {
        await classesService.updateClass(selectedClass.id, formData);
        toaster.create({ title: 'Class updated successfully', type: 'success' });
        
      } else {
        await classesService.createClass(formData);
      }
      setIsDialogOpen(false);
      setSelectedClass(null);
      setFormData({ name: '' });
      fetchClasses();
    } catch (error) {
      toaster.create({ title: 'Error creating class', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classesService_dev.deleteClass(id);
        toaster.create({ title: 'Class deleted successfully', type: 'success' });
        fetchClasses();
      } catch (error) {
        toaster.create({ title: 'Error deleting class', type: 'error' });
      }
    }
  };

  const openDialog = (cls: Class | null) => {
    setSelectedClass(cls);
    setFormData({ name: cls ? cls.name : '' });
    setIsDialogOpen(true);
  };

  function onClassClick(cls: Class): void {
    navigate(`/admin/classes/${cls.id}/lessons`);
    throw new Error('Function not implemented.');
  }

  return (
    <Box bg={colors.background} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <HStack justify="space-between" align="center">
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl" }}
                color={colors.primary}
              >
                Manage Classes
              </Heading>
              <Button
                
                onClick={() => openDialog(null)}
                colorScheme="green"
                bg={colors.primary}
              >
                <FaPlus />
                Add Class
              </Button>
            </HStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {classes.map((cls) => (
              <Card.Root
             
                key={cls.id}
                bg="white"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.3s"
                _hover={{
                  boxShadow: "lg",
                  borderColor: colors.primary,
                }}
                borderWidth="1px"
                borderColor="gray.100"
              >
                <CardBody p={6}  >
                  <VStack align="start" gap={4}>
                    <HStack gap={3}>
                      <Icon  boxSize={6} color={colors.primary} >
                        <FaGraduationCap />
                      </Icon>
                      <Tag
                        size="sm"
                        variant="subtle"
                        colorScheme="green"
                        bg={colors.secondary}
                        color={colors.primary}
                      >
                        Class ID: {cls.id}
                      </Tag>
                    </HStack>
                    
                    <Heading onClick={() => onClassClick(cls)} as="h3" fontSize="xl" color={colors.primary} fontWeight="bold">
                      {cls.name}
                    </Heading>

                    <HStack justify="flex-end" w="full" gap={2}>
                      <IconButton
                        aria-label="Edit class"
                        onClick={() => openDialog(cls)}
                        colorScheme="blue"
                        variant="ghost"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        aria-label="Delete class"
                        onClick={() => handleDelete(cls.id)}
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

        <Dialog.Root
          open={isDialogOpen} 
          // onClose={() => {
          //   setIsDialogOpen(false);
          //   setSelectedClass(null);
          //   setFormData({ name: '' });
          // }}
        >
     
          <DialogContent>
            <DialogHeader>
              {selectedClass ? 'Edit Class' : 'Add New Class'}
            </DialogHeader>
            <DialogBody>
              <form onSubmit={handleSubmit}>
                
                <Stack gap={4}>
                  <Input
                    placeholder="Enter class name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    size="md"
                  />
                </Stack>
                <DialogFooter>
                  <Button 
                    mr={3} 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setSelectedClass(null);
                      setFormData({ name: '' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="green" bg={colors.primary}>
                    {selectedClass ? 'Update' : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogBody>
          </DialogContent>
        </Dialog.Root>
      </Container>
    </Box>
  );
};

export default AdminClassesPage;