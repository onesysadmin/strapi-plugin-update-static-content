import { pluginId } from '../../pluginId';
import Config from '../../../../types/Config';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Box,
  Flex,
  EmptyStateLayout,
  IconButton,
} from '@strapi/design-system';
import { Trash, Pencil } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import PageLoading from '../PageLoading';
import useFetch from '../../hooks/useFetch';
import { ConfirmDialog } from '../ConfirmDialog';

export default function WorkflowsTable({ onEdit }: { onEdit: (workflowId: string) => void }) {
  const [data, isDataLoading, refetchData] = useFetch<Config[]>(`/${pluginId}/config`, false, []);
  const { del } = useFetchClient();

  const [deleteDocumentId, setDeleteDocumentId] = useState<string | null>(null);
  const CONFIRM_DELETE_MESSAGE = useFormattedLabel('settings.table.confirmDelete.message');
  const CONFIRM_DELETE_TITLE = useFormattedLabel('settings.table.confirmDelete.title');
  const CONFIRM_DELETE_BUTTON = useFormattedLabel('settings.table.confirmDelete.confirm');
  const EMPTY_STATE_CONTENT = useFormattedLabel('settings.table.empty.content');

  async function handleDelete(documentId: string) {
    try {
      await del(`/${pluginId}/config/${documentId}`);
      refetchData();
    } catch (err) {
      console.error(err);
    }
  }

  const openDeleteDialog = (documentId: string) => {
    setDeleteDocumentId(documentId);
  };

  const closeDeleteDialog = () => {
    setDeleteDocumentId(null);
  };

  const confirmDelete = async () => {
    if (deleteDocumentId !== null) {
      const idToDelete = deleteDocumentId;
      closeDeleteDialog();
      await handleDelete(idToDelete);
    }
  };

  if (isDataLoading) {
    return <PageLoading />;
  }

  const isEmpty = !data || data.length === 0;

  return (
    <Box background="neutral0" shadow="tableShadow" hasRadius width="100%">
      {isEmpty
        ? (
            <EmptyStateLayout icon={<EmptyDocuments width="160px" />} content={EMPTY_STATE_CONTENT} />
          )
        : (
            <Table colCount={7} rowCount={data.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">ID</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Description</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">GitHub Account</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Repository</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Branch</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Workflow</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Actions</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((workflow) => (
                  <Tr key={workflow.id}>
                    <Td>
                      <Typography textColor="neutral800">{workflow.id}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{workflow.description}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{workflow.githubAccount}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{workflow.repo}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{workflow.branch}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{workflow.workflow}</Typography>
                    </Td>
                    <Td>
                      <Flex gap={0}>
                        <IconButton
                          onClick={() => { if (workflow.documentId) onEdit(workflow.documentId); }}
                          label="Edit"
                          variant="ghost"
                        >
                          <Pencil />
                        </IconButton>
                        <IconButton
                          onClick={() => { if (workflow.documentId) openDeleteDialog(workflow.documentId); }}
                          label="Delete"
                          variant="ghost"
                        >
                          <Trash />
                        </IconButton>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}

      <ConfirmDialog
        bodyText={{
          id: 'settings.table.confirmDelete.message',
          defaultMessage: CONFIRM_DELETE_MESSAGE,
        }}
        title={{
          id: 'settings.table.confirmDelete.title',
          defaultMessage: CONFIRM_DELETE_TITLE,
        }}
        rightButtonText={{
          id: 'settings.table.confirmDelete.confirm',
          defaultMessage: CONFIRM_DELETE_BUTTON,
        }}
        isOpen={deleteDocumentId !== null}
        onToggleDialog={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}
