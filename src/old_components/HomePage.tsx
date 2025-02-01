import {
  Box,
   Button,
   Container,
   Heading,
   Text,
   VStack,
   SimpleGrid,
   Icon,
   Flex,
   HStack,
   CardBody,
   // Divider,
   // SlideFade,
   // ScaleFade,
   // Wrap,
   // WrapItem,
   CardRoot,
 } from '@chakra-ui/react';
 import "../styles/slider.css";
 import { FaDna, FaLeaf, FaBrain, FaBook, FaMicroscope, FaUsers, FaTelegram } from 'react-icons/fa';
 import { DopamineLiteColors } from '@/themes/colors';
 import { useNavigate } from 'react-router-dom';
 import { useInView } from 'react-intersection-observer';
 import { Avatar } from "@/components/ui/avatar"
 import CountUp from "react-countup";
 import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);

 
 
 export default function HomePage() {
   const navigator = useNavigate();
   const { ref: tutorRef, inView: tutorInView } = useInView({ 
    triggerOnce: false,
    threshold: 0.6 
  });
   const { ref: testimonialsRef } = useInView({ triggerOnce: true });
   const { ref: telegramRef} = useInView({ triggerOnce: true });
   const { ref: featuresRef, inView: featuresInView } = useInView(
    { triggerOnce: false,
      threshold: 0.6,
     });


   const variants = {
    hidden: { scale: 0.4, opacity: 0, transition: { duration: 1, ease: 'easeInOut' } },
    visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
  };


   const features = [
     {
       icon: FaDna,
       title: "Molecular Biology",
       description: "Explore DNA, RNA, and cellular processes"
     },
     {
       icon: FaLeaf,
       title: "Ecology & Environment",
       description: "Study ecosystems and environmental biology"
     },
     {
       icon: FaBrain,
       title: "Human Biology",
       description: "Learn about anatomy and physiology"
     }
   ];
 
   const sliderRef = useRef<HTMLDivElement | null>(null);
   const [index, setIndex] = useState(0);
   const testimonials = [
    {
      name: "Sarah Johnson",
      grade: "A Grade (2023)",
      comment: "The teaching methods helped me understand complex concepts easily. I achieved my dream grade!",
      avatar: "/path/to/avatar1.jpg"
    },
    {
      name: "Michael Chen",
      grade: "A Grade (2023)",
      comment: "The practice questions and detailed explanations were invaluable for my exam preparation.",
      avatar: "/path/to/avatar2.jpg"
    },
    {
      name: "Emma Williams",
      grade: "A Grade (2023)",
      comment: "The virtual labs and interactive sessions made biology fun and engaging to learn.",
      avatar: "/path/to/avatar3.jpg"
    },
    {
      name: "Sarah Johnson",
      grade: "A Grade (2023)",
      comment: "The teaching methods helped me understand complex concepts easily. I achieved my dream grade!",
      avatar: "/path/to/avatar1.jpg"
    },
    {
      name: "Michael Chen",
      grade: "A Grade (2023)",
      comment: "The practice questions and detailed explanations were invaluable for my exam preparation.",
      avatar: "/path/to/avatar2.jpg"
    },
    {
      name: "Sarah Johnson",
      grade: "A Grade (2023)",
      comment: "The teaching methods helped me understand complex concepts easily. I achieved my dream grade!",
      avatar: "/path/to/avatar1.jpg"
    },
    {
      name: "Michael Chen",
      grade: "A Grade (2023)",
      comment: "The practice questions and detailed explanations were invaluable for my exam preparation.",
      avatar: "/path/to/avatar2.jpg"
    },
    {
      name: "Sarah Johnson",
      grade: "A Grade (2023)",
      comment: "The teaching methods helped me understand complex concepts easily. I achieved my dream grade!",
      avatar: "/path/to/avatar1.jpg"
    },
    {
      name: "Michael Chen",
      grade: "A Grade (2023)",
      comment: "The practice questions and detailed explanations were invaluable for my exam preparation.",
      avatar: "/path/to/avatar2.jpg"
    },
    {
      name: "Sarah Johnson",
      grade: "A Grade (2023)",
      comment: "The teaching methods helped me understand complex concepts easily. I achieved my dream grade!",
      avatar: "/path/to/avatar1.jpg"
    }
  ];
 
     const telegramGroups = [
     {
       name: "2026 Theory Class",
       link: "https://t.me/biology2026theory",
       description: "Join for daily updates and discussions on theory topics"
     },
     {
       name: "2026 Revision Class",
       link: "https://t.me/biology2026revision",
       description: "Get access to revision materials and practice questions"
     },
     {
       name: "Past Papers Discussion",
       link: "https://t.me/biologypastpapers",
       description: "Discuss past paper questions and solutions"
     }
   ];

   const setActiveCard = () => {
    const sliderCards = sliderRef.current?.children;
    if (!sliderCards) return;

    Array.from(sliderCards).forEach((card, i) => {
      if (i === index + 1) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  };

  useEffect(() => {
    setActiveCard();
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex > testimonials.length - 3) {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            sliderRef.current.style.transform = 'translateX(0)';
          }
          return 0;
        }
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
          sliderRef.current.style.transform = `translateX(-${newIndex * 33.33}%)`;
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);
   
 
   return (
     <>
     <Box>
      <Box bg={DopamineLiteColors.creamColor}>
        <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
          <VStack gap={6} textAlign="center">
            <MotionHeading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              color={DopamineLiteColors.greenColor}
              lineHeight="1.2"
              fontWeight="bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
            >
              Discover the Wonder of Biology
            </MotionHeading>
            
            <MotionText
              fontSize={{ base: "xl", md: "2xl" }}
              color="gray.600"
              maxW="container.md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Interactive lessons and resources to make learning biology engaging and effective
            </MotionText>

            <Flex gap={5} mt={4}>
              <Button
                size="lg"
                bg={DopamineLiteColors.orangeColor}
                color="white"
                _hover={{
                  bg: "#e68200",
                  transform: "scale(1.2)", 
                  transition: "transform 0.2s ease-in-out", 
                }}
              >
                <HStack gap={2}>
                  <FaBook />
                  <Text>Start Learning</Text>
                </HStack>
              </Button>
              <Button
                onClick={() => {
                  navigator('/classes');
                }}
                size="lg"
                variant="outline"
                borderColor={DopamineLiteColors.greenColor}
                color={DopamineLiteColors.greenColor}
                _hover={{
                  bg: "#00712D",
                  color: "white",
                  transform: "scale(1.2)", 
                  transition: "transform 0.2s ease-in-out", 
                }}
              >
                Browse Courses
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
       <Box bg="white">
         <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
           <VStack gap={12}>
             <Box textAlign="center">
               <Heading
                 as="h2"
                 fontSize={{ base: "3xl", md: "4xl" }}
                 color={DopamineLiteColors.greenColor}
                 mb={4}
               >
                 Comprehensive Learning Experience
               </Heading>
               <Text fontSize="xl" color="gray.600">
                 Explore our wide range of biology topics
               </Text>
             </Box>
             <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
                 {features.map((feature, index) => (
                   <MotionBox
                     key={index}
                     bg={DopamineLiteColors.lightGreenColor}
                     p={8}
                     borderRadius="lg"
                     transition={{ duration: 0.2 }}
                     _hover={{
                       transform: "scale(1.05)",
                       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
                     }}
                     animate={{
                       x: [0, 20, 0],  
                       transition: {
                         repeat: Infinity,
                         duration: 3,
                         ease: "easeInOut",
                         delay: index * 0.5  
                       }
                     }}
                     willChange="transform, box-shadow"
                     > 
                     <VStack gap={4} align="flex-start">
                       <Icon boxSize={8} color={DopamineLiteColors.greenColor}> 
                         <feature.icon />
                       </Icon>
                       <Heading as="h3" fontSize="xl" color={DopamineLiteColors.greenColor}>
                         {feature.title}
                       </Heading>
                       <Text color="gray.600">{feature.description}</Text>
                     </VStack>
                   </MotionBox>
                 ))}
               </SimpleGrid>
           </VStack>
         </Container>
       </Box>
       <Box bg={DopamineLiteColors.greenColor} ref={featuresRef}>
       <MotionVStack
        variants={variants}
        initial="hidden"
        animate={featuresInView ? 'visible' : 'hidden'}
        textAlign="center"
        transformOrigin="center">
          <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <VStack textAlign="center">
            <Icon boxSize={8} color="white" mb={4}>
              <FaBook />
            </Icon>
            <Text fontSize="4xl" fontWeight="bold" color="white">
              {featuresInView && (
                <CountUp start={0} end={100} duration={3} suffix="+" />
              )}
            </Text>
            <Text fontSize="lg" color={DopamineLiteColors.lightGreenColor}>
              Interactive Lessons
            </Text>
          </VStack>

          {/* Virtual Labs */}
          <VStack textAlign="center">
            <Icon boxSize={8} color="white" mb={4}>
              <FaMicroscope />
            </Icon>
            <Text fontSize="4xl" fontWeight="bold" color="white">
              {featuresInView && (
                <CountUp start={0} end={50} duration={3} suffix="+" />
              )}
            </Text>
            <Text fontSize="lg" color={DopamineLiteColors.lightGreenColor}>
              Virtual Labs
            </Text>
          </VStack>

          {/* Active Students */}
          <VStack textAlign="center">
            <Icon boxSize={8} color="white" mb={4}>
              <FaUsers />
            </Icon>
            <Text fontSize="4xl" fontWeight="bold" color="white">
              {featuresInView && (
                <CountUp start={0} end={10000} duration={3} suffix="+" />
              )}
            </Text>
            <Text fontSize="lg" color={DopamineLiteColors.lightGreenColor}>
              Active Students
            </Text>
          </VStack>
            </SimpleGrid>
          </Container>
        </MotionVStack>
      </Box>
       {/* Tutor Profile Section */}
       <Box bg={DopamineLiteColors.creamColor} ref={tutorRef}>
        <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box>
              <MotionBox
                initial={{ opacity: 0, x: -300 }} 
                animate={tutorInView ? { opacity: 1, x: 0 } : {}} 
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 1 }} >
                <Avatar
                  size="2xl"
                  src="/path/to/tutor-image.jpg"
                  mb={6}
                />
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  color={DopamineLiteColors.greenColor}
                  mb={4}
                >
                  Meet Your Biology Expert
                </Heading>
                <Text fontSize="xl" color="gray.600" mb={4}>
                  Mr. Sashanka Dhanujaya, MBBS(UG)
                </Text>
                <Text color="gray.600">
                  With over 5 years of teaching experience, Mr. Sashanka has helped thousands of students 
                  achieve their academic goals. His innovative teaching methods and deep understanding 
                  of biology make complex concepts easy to grasp.
                </Text>
              </MotionBox>
            </Box>
            <Box>
              <MotionBox
                initial={{ opacity: 0, scale: 0.5}}  // Start off-screen (to the right)
                animate={tutorInView ? { opacity: 1, scale: 1} : {}}  // Move to original position when in view
                transition={{ duration: 1 }}
              >
              <SimpleGrid columns={2} gap={4}>
                    {/* Years Teaching */}
                    <CardRoot>
                      <CardBody>
                        <Text fontSize="4xl" fontWeight="bold" color={DopamineLiteColors.greenColor}>
                          {tutorInView && <CountUp start={0} end={15} duration={2} suffix="+" />}
                        </Text>
                        <Text>Years Teaching</Text>
                      </CardBody>
                    </CardRoot>

                    {/* Students Taught */}
                    <CardRoot>
                      <CardBody>
                        <Text fontSize="4xl" fontWeight="bold" color={DopamineLiteColors.greenColor}>
                          {tutorInView && <CountUp start={0} end={5000} duration={2} suffix="+" />}
                        </Text>
                        <Text>Students Taught</Text>
                      </CardBody>
                    </CardRoot>

                    {/* Success Rate */}
                    <CardRoot>
                      <CardBody>
                        <Text fontSize="4xl" fontWeight="bold" color={DopamineLiteColors.greenColor}>
                          {tutorInView && <CountUp start={0} end={98} duration={2} suffix="%" />}
                        </Text>
                        <Text>Success Rate</Text>
                      </CardBody>
                    </CardRoot>

                    {/* A Grades */}
                    <CardRoot>
                      <CardBody>
                        <Text fontSize="4xl" fontWeight="bold" color={DopamineLiteColors.greenColor}>
                          {tutorInView && <CountUp start={0} end={200} duration={2} suffix="+" />}
                        </Text>
                        <Text>A Grades</Text>
                      </CardBody>
                    </CardRoot>
                  </SimpleGrid>
              </MotionBox>
            </Box>
            </SimpleGrid>
        </Container>
      </Box>
 
        {/* Student Testimonials Section */}
       <Box bg="white" ref={testimonialsRef}>
         <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
           <VStack gap={8}>
             <Heading
               as="h2"
               fontSize={{ base: "3xl", md: "4xl" }}
               color={DopamineLiteColors.greenColor}
               textAlign="center"
             >
               What Our Students Say
             </Heading>
             <div className="slider-container">
                  <div className="slider-wrapper">  
                    <div className="slider-content">
                      <div ref={sliderRef} className="slider-track">
                        {testimonials.map((testimonial, i) => (
                          <div
                            key={i}
                            className={`slider-card ${i === index + 1 ? 'active' : ''}`}
                          >
                            <div className="card-inner">
                              <div className="card-header">
                                <div className="avatar-container">
                                  <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="avatar"
                                  />
                                  <div className="status-indicator"></div>
                                </div>
                                <div className="user-info">
                                  <h3>{testimonial.name}</h3>
                                  <p>{testimonial.grade}</p>
                                </div>
                              </div>
                              <div className="testimonial-content">
                                <svg className="quote-icon" viewBox="0 0 24 24">
                                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p>{testimonial.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="navigation-dots">
                      {testimonials.slice(0, testimonials.length - 2).map((_, i) => (
                        <button
                          key={i}
                          className={`dot ${i === index ? 'active' : ''}`}
                          onClick={() => setIndex(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
             <Button
               onClick={() => navigator('/testimonials')}
               size="lg"
               variant="outline"
               borderColor={DopamineLiteColors.greenColor}
               color={DopamineLiteColors.greenColor}
               _hover={{ bg: DopamineLiteColors.greenColor, color: "white" }}
             >
               View All Testimonials
             </Button>
           </VStack>
         </Container>
       </Box>
       <Box bg={DopamineLiteColors.lightGreenColor} ref={telegramRef}>
         <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
             <VStack gap={8}>
               <Heading
                 as="h2"
                 fontSize={{ base: "3xl", md: "4xl" }}
                 color={DopamineLiteColors.greenColor}
                 textAlign="center"
               >
                 Join Our Learning Community
               </Heading>
               <Text fontSize="xl" color="gray.600" textAlign="center">
                 Connect with fellow students and get instant updates through our Telegram groups
               </Text>
               <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
                 {telegramGroups.map((group, index) => (
                   <CardRoot
                     key={index}
                     bg="white"
                     _hover={{
                       transform: "translateY(-8px)",
                       transition: "transform 0.2s"
                     }}
                   >
                     <CardBody>
                       <VStack gap={4}>
                         <Icon boxSize={8} color={DopamineLiteColors.greenColor} >
                           <FaTelegram />
                         </Icon>
                         <Heading size="md" color={DopamineLiteColors.greenColor}>
                           {group.name}
                         </Heading>
                         <Text color="gray.600" textAlign="center">
                           {group.description}
                         </Text>
                         <Button
                           as="a"
                           // href={group.link}
                           // target="_blank"
                           bg={DopamineLiteColors.greenColor}
                           color="white"
                           _hover={{ bg: "#00712D" }}>
                           <FaTelegram />
                           Join Group
                         </Button>
                       </VStack>
                     </CardBody>
                   </CardRoot>
                 ))}
               </SimpleGrid>
             </VStack>
         </Container>
       </Box>
     </Box>
     </>
   );
 }