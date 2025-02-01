import { Button } from "@/components/ui/button"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DopamineLiteColors } from "@/themes/colors"
import { 
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Separator,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBook, FaVideo, FaNotesMedical, FaChevronRight, FaBars } from 'react-icons/fa';
import { Class } from '@/types/class.types';
import { Lesson } from '@/types/lesson.types';
import { classesService_dev } from '@/services/classes';
import { lessonsService_dev } from '@/services/lessons';

interface SideDrawerProps {
  classId?: string;
}

const SideDrawer = ({ classId }: SideDrawerProps) => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class>();
  const [classLessons, setClassLessons] = useState<Lesson[]>([]);
  const [selectedLesson, _setSelectedLesson] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (classId) {
        try {
          const data = await classesService_dev.getClassById(classId);
          setClassData(data);
          const lessons = await lessonsService_dev.getLessonsByClassId(data.id);
          setClassLessons(lessons);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [classId]);

  const handleTitleClick = (classId: string) => {
    navigate(`/classes/${classId}/lessons`)
  }

  const handleEachLessonClick = (lesson: Lesson) => {
    const urlTitle = lesson.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/classes/${lesson.classId}/lessons/${lesson.id}/${urlTitle}`);
  };

  const handleLessonsClick = () => {
    navigate(`/classes/${classId}/lessons`);
  }

  const handleNotesClick = () => {
    navigate(`/classes/${classId}/notes`);
  }

   const handleEachNoteClick = (lesson: Lesson) => {
    navigate(`/classes/${lesson.classId}/notes/${lesson.id}`);
  }

  return (
    <Box zIndex={1}>
      <DrawerRoot  placement={'start'}>
      <DrawerBackdrop />
      <DrawerTrigger bg={DopamineLiteColors.greenColor} asChild>
        <Button 
       
          variant="ghost" 
          size="sm"
        >
          <Icon  >
            <FaBars />
          </Icon>
          Menu
        </Button>
      </DrawerTrigger>
      <DrawerContent bg={DopamineLiteColors.creamColor}>
        <DrawerHeader bg={DopamineLiteColors.greenColor}>
          <Button onClick={() => {
          handleTitleClick(classData?.id||'')
        }} bg={'transparent'}><Box   py={2}>
            <Badge
              fontSize="sm"
              px={3}
              py={1}
              bg={DopamineLiteColors.lightGreenColor}
              color={DopamineLiteColors.greenColor}
              borderRadius="full"
            >
              {classData?.name || 'Loading...'}
            </Badge>
          </Box></Button>
          
          <DrawerCloseTrigger />
        </DrawerHeader>
        
        <DrawerBody>
          <VStack align="stretch" gap={4}>
            {/* Lessons Section */}
            <Box>

              <Button bg={'transparent'} onClick={handleLessonsClick}>
                <HStack mb={4} color={DopamineLiteColors.greenColor}>
                <Icon><FaVideo /></Icon>
                <Text fontWeight="bold">Lessons</Text>
              </HStack>
              </Button>
              
              <VStack align="stretch" gap={2}>
                {classLessons.map((lesson) => (
                  <Button
                  color={'black'}
                    key={lesson.id}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    py={2}
                    px={4}
                    onClick={() => handleEachLessonClick(lesson)}
                    bg={selectedLesson === lesson.id ? DopamineLiteColors.lightGreenColor : 'transparent'}
                    _hover={{
                      bg: DopamineLiteColors.lightGreenColor,
                      color: DopamineLiteColors.greenColor,
                    }}
                  >
                    <Icon boxSize={4}><FaBook /></Icon>
                    <VStack align="start" gap={0}>
                      <Text color={'black'} fontSize="sm" fontWeight="medium">
                        Lesson {lesson.lesson}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {lesson.title}
                      </Text>
                    </VStack>
                    <Icon boxSize={3}><FaChevronRight /></Icon>
                  </Button>
                ))}
              </VStack>
            </Box>

            <Separator />

            {/* Notes Section */}
            <Box>
              <Button bg={'transparent'} onClick={handleNotesClick}>
                <HStack mb={4} color={DopamineLiteColors.greenColor}>
                <Icon><FaNotesMedical /></Icon>
                <Text fontWeight="bold">Notes</Text>
              </HStack>
              </Button>
              
              <VStack align="stretch" gap={2}>
                {classLessons.map((lesson) => (
                  <Button
                    key={`note-${lesson.id}`}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="auto"
                    py={2}
                    px={4}
                    onClick={() => handleEachNoteClick(lesson)}
                    _hover={{
                      bg: DopamineLiteColors.lightGreenColor,
                      color: DopamineLiteColors.greenColor,
                    }}
                  >
                    <Icon color={'black'} boxSize={4}><FaNotesMedical /></Icon>
                    <Text color={'black'} fontSize="sm">Notes for Lesson {lesson.lesson}</Text>
                  </Button>
                ))}
              </VStack>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
    </Box>
  );
}

export default SideDrawer;