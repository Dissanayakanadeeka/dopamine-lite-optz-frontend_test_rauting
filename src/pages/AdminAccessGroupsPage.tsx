import { useState, useEffect } from 'react';
import { Box, Container, VStack, Heading, Button, Table, Icon, IconButton, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { accessGroupService_dev } from "@/services/access-groupes";
import { AccessGroup } from "@/types/access-group.types";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

const colors = {
  primary: "#00712D",
  background: "#FFFBE6",
};

export default function AdminAccessGroupsPage() {
  const [groups, setGroups] = useState<AccessGroup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const data = await accessGroupService_dev.getGroups();
    setGroups(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await accessGroupService_dev.deleteGroup(id);
        toaster.create({ title: 'Group deleted successfully', type: 'success' });
        fetchGroups();
      } catch (error) {
        toaster.create({ title: 'Error deleting group', type: 'error' });
      }
    }
  };

  return (
    <Box bg={colors.background} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <HStack justify="space-between">
            <Heading color={colors.primary}>Access Groups</Heading>
            <Button 
              onClick={() => navigate('/admin/access-groups/create')}
              colorScheme="green"
              bg={colors.primary}
            >
              <Icon  mr={2} >
                <FaPlus />
              </Icon>
              Add Group
            </Button>
          </HStack>
          
          <Table.Root  bg="white" rounded="lg">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Access List</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {groups.map((group) => (
                <Table.Row key={group.id}>
                  <Table.Cell>{group.name}</Table.Cell>
                  <Table.Cell>{group.accessList.join(', ')}</Table.Cell>
                  <Table.Cell>
                    <HStack gap={2}>
                      <IconButton
                        aria-label="Edit group"
                        onClick={() => navigate(`/admin/access-groups/${group.id}/edit`)}
                        colorScheme="blue"
                        variant="ghost"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        aria-label="Delete group"
                        onClick={() => handleDelete(group.id)}
                        colorScheme="red"
                        variant="ghost"
                      >
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </VStack>
      </Container>
    </Box>
  );
}