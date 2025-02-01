import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Button,
  Input,
  Text,
  HStack,
  Textarea,
  IconButton,
  Card
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { accessGroupService_dev } from "@/services/access-groupes";
import { toaster } from "@/components/ui/toaster";

const colors = {
  primary: "#00712D",
  secondary: "#D5ED9F",
  background: "#FFFBE6",
  accent: "#FF9100"
};

export default function AdminEditAccessGroupPage() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    accessList: [] as string[]
  });
  const [emailInput, setEmailInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const group = await accessGroupService_dev.getGroupById(groupId!);
        setFormData({
          name: group.name,
          accessList: group.accessList
        });
      } catch (error) {
        toaster.create({ title: 'Error fetching group', type: 'error' });
      }
    };
    fetchGroup();
  }, [groupId]);

  const filteredEmails = formData.accessList.filter(email =>
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedEmails = filteredEmails.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await accessGroupService_dev.updateGroup(groupId!, formData);
      toaster.create({ title: 'Group updated successfully', type: 'success' });
      navigate('/admin/access-groups');
    } catch (error) {
      toaster.create({ title: 'Error updating group', type: 'error' });
    }
  };

  const handleAddEmails = () => {
    const emails = emailInput
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emails.length === 0) {
      toaster.create({
        title: 'No valid emails found',
        type: 'error',
        description: 'Please enter valid email addresses separated by commas or new lines'
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      accessList: [...new Set([...prev.accessList, ...emails])]
    }));
    setEmailInput('');
    toaster.create({
      title: `Added ${emails.length} email${emails.length > 1 ? 's' : ''}`,
      type: 'success'
    });
  };

  const removeEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      accessList: prev.accessList.filter(e => e !== email)
    }));
    toaster.create({ title: 'Email removed', type: 'success' });
  };

  return (
    <Box bg={colors.background} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack gap={8} align="stretch">
          <Card.Root p={6}>
            <VStack align="stretch" gap={6}>
              <Heading color={colors.primary} size="lg">Edit Access Group</Heading>

              <form onSubmit={handleSubmit}>
                <VStack gap={6} align="stretch">
                  <Box>
                    <Text mb={2} fontWeight="medium" color={colors.primary}>Group Name</Text>
                    <Input
                      color={'black'}
                      bg="white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium" color={colors.primary}>Add Emails to Access List</Text>
                    <VStack align="stretch" gap={3}>
                      <Textarea
                        color={'black'}
                        bg="white"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter emails (comma or new line separated)&#10;e.g: user1@example.com, user2@example.com"
                        rows={4}
                      />
                      <Button
                        onClick={handleAddEmails}
                        colorScheme="green"
                        bg={colors.primary}
                        alignSelf="flex-start"
                      >
                        Add Emails
                      </Button>
                    </VStack>
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium" color={colors.primary}>Current Access List</Text>
                    <Card.Root bg="white" p={4}>
                      <VStack align="stretch" gap={4}>
                        <Input
                          color="black"
                          placeholder="Search emails..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          bg="white"
                        />

                        <VStack align="stretch" gap={2}>
                          {filteredEmails.length === 0 ? (
                            <Text color="gray.500">
                              {searchTerm ? 'No matching emails found' : 'No emails added yet'}
                            </Text>
                          ) : (
                            <>
                              {paginatedEmails.map(email => (
                                <HStack key={email} justify="space-between" p={2} bg="gray.50" rounded="md">
                                  <Text color={colors.primary}>{email}</Text>
                                  <IconButton
                                    aria-label="Remove email"
                                    size="sm"
                                    onClick={() => removeEmail(email)}
                                    variant="ghost"
                                    colorScheme="red"
                                  >
                                    <FaTimes />
                                  </IconButton>
                                </HStack>
                              ))}

                              <HStack justify="space-between" pt={4}>
                                <Text color="gray.500">
                                  Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, filteredEmails.length)} of {filteredEmails.length}
                                </Text>
                                <HStack>
                                  <Button
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    disabled={currentPage === 0}
                                    size="sm"
                                  >
                                    Previous
                                  </Button>
                                  <Button
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    disabled={currentPage >= totalPages - 1}
                                    size="sm"
                                  >
                                    Next
                                  </Button>
                                </HStack>
                              </HStack>
                            </>
                          )}
                        </VStack>
                      </VStack>
                    </Card.Root>
                  </Box>

                  <HStack justify="flex-end" pt={4}>
                    <Button onClick={() => navigate('/admin/access-groups')} variant="outline">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      bg={colors.primary}
                      color="white"
                      _hover={{ bg: colors.primary }}
                    >
                      Update Access
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </VStack>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}