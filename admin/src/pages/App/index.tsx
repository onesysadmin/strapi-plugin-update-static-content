import {
  Button,
  Flex,
  Menu,
  Link,
  Table,
  Tbody,
  TextButton,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
  Box,
  EmptyStateLayout,
} from '@strapi/design-system';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { Layouts, Page, useFetchClient } from '@strapi/strapi/admin';
import { Check, More, Plus, ArrowClockwise } from '@strapi/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../../../../types/Config';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import CustomRow from '../../components/CustomRow';
import PageLoading from '../../components/PageLoading';
import ToastMsg from '../../components/ToastMsg';
import useFetch from '../../hooks/useFetch';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { pluginId } from '../../pluginId';
import { Pagination } from '../../components/Pagination';

const THEAD_ITEMS = [
  'Run Number',
  'Workflow Name',
  'Status',
  'Creation Date',
  'Duration',
  <VisuallyHidden key="actions" />,
];

interface Data {
  total_count?: number;
  workflow_runs?: {
    id: number;
    conclusion: 'success' | 'failure';
    name: string;
    run_number: number;
    run_started_at: string;
    html_url: string;
    updated_at: string;
    disabled: string;
    created_at: string;
  }[];
}

interface Toast {
  variant: 'danger' | 'success';
  title: string;
  message: string;
  action?: React.ReactNode;
}

function App() {
  // Hooks
  const navigate = useNavigate();
  const [loadingTriggerButton, setLoadingTriggerButton] = useState(false);
  const [toastMsg, setToastMsg] = useState<Toast>({} as Toast);
  const [toastToggle, setToastToggle] = useState(false);
  const { post } = useFetchClient();
  const [workflows, isWorkflowsFetching] = useFetch<Config[]>(
    `/${pluginId}/config`,
  );

  const [page, setPage] = useState(1);

  const [selectedWorkflow, setSelectedWorkflow] = useState<string>();

  const hasWorkflows = Array.isArray(workflows) && workflows.length > 0;

  const [data, isLoading, handleRefetch] = useFetch<Data>(
    `/${pluginId}/github-actions-history/${selectedWorkflow || '0'}?page=${page}`,
  );

  const maxPerPage = 20;
  const numberOfItems = data.total_count || 0;

  function handleSetPage(page: number) {
    setPage(page);
    handleRefetch();
  }

  // Translations
  const TITLE = useFormattedLabel('plugin.title');
  const HEADER_TITLE = useFormattedLabel('plugin.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('plugin.headers.subtitle');
  const TOAST_SUCCESS_TITLE = useFormattedLabel('plugin.toast.success.title');
  const TOAST_SUCCESS_DESCRIPTION = useFormattedLabel('plugin.toast.success.description');
  const TOAST_FAILURE_UNKNOWN_TITLE = useFormattedLabel('plugin.toast.failure.unknown.title');
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unknown.description',
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.title',
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFormattedLabel(
    'plugin.toast.failure.unprocessableEntity.description',
  );
  const TOAST_PERMISSION_DENIED_MSG = useFormattedLabel('permission.toast.message');
  const TOAST_PERMISSION_DENIED_TITLE = useFormattedLabel('permission.toast.title');
  const SEE_MORE_BUTTON = useFormattedLabel('button.seeMore');
  const REFRESH_BUTTON = useFormattedLabel('button.refresh');
  const EMPTY_STATE_CONTENT = useFormattedLabel('plugin.empty.content');
  const EMPTY_STATE_ACTION = useFormattedLabel('plugin.empty.action');

  const [isConfirmOneDialogOpen, setIsConfirmOneDialogOpen] = useState<boolean>(false);
  const [isConfirmAllDialogOpen, setIsConfirmAllDialogOpen] = useState<boolean>(false);

  // Callbacks

  const handleSelectWorkflow = (documentId: string) => {
    setPage(1);
    setSelectedWorkflow(documentId);
    handleRefetch();
  };

  function toggleConfirmOneDialog() {
    setIsConfirmOneDialogOpen((prev) => !prev);
  }

  function toggleConfirmAllDialog() {
    setIsConfirmAllDialogOpen((prev) => !prev);
  }

  // Callbacks

  async function triggerAllGithubActions() {
    try {
      await post(`/${pluginId}/github-actions-trigger/all`);
      handleRefetch();
    } catch (error: unknown) {
      console.error(error);
      setToastMsg({
        variant: 'danger',
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
      });
      setToastToggle(true);
      return;
    }
  }

  async function triggerGithubActions() {
    try {
      setLoadingTriggerButton(true);
      await post(`/${pluginId}/github-actions-trigger/${selectedWorkflow || '0'}`);
      setToastMsg({
        variant: 'success',
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: (
          <TextButton
            endIcon={<ArrowClockwise />}
            onClick={() => {
              handleRefetch();
              setToastToggle(false);
            }}
          >
            {REFRESH_BUTTON}
          </TextButton>
        ),
      });
      setToastToggle(true);
    } catch (error: unknown) {
      console.error(error);

      const err = error as { response?: { data?: { error?: { status?: number; name?: string } } } };
      const status = err.response?.data?.error?.status;
      const name = err.response?.data?.error?.name;

      if (status === 422 && name === 'UnprocessableEntityError') {
        setToastMsg({
          variant: 'danger',
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: (
            <Link href="https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow">
              {SEE_MORE_BUTTON}
            </Link>
          ),
        });
        return;
      }

      if (status === 403 && name === 'PolicyError') {
        setToastMsg({
          variant: 'danger',
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG,
        });
        return;
      }

      setToastMsg({
        variant: 'danger',
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION,
      });
    } finally {
      setToastToggle(true);
      setLoadingTriggerButton(false);
    }
  }

  function Actions() {
    const PRIMARY_ACTION_BUTTON = useFormattedLabel('plugin.buttons.primary');
    const TRIGGER_ALL_WORKFLOWS_BUTTON = useFormattedLabel('plugin.buttons.triggerAllWorkflows');
    const CONFIRM_MSG = useFormattedLabel('confirm.message');

    return (
      <Flex gap={3}>
        <Button
          onClick={() => {
            handleRefetch();
            setToastToggle(false);
          }}
          variant="secondary"
          loading={isLoading}
          startIcon={<ArrowClockwise />}
        >
          {REFRESH_BUTTON}
        </Button>
        <ConfirmDialog
          bodyText={{
            id: 'confirm.message',
            defaultMessage: CONFIRM_MSG,
          }}
          title={{
            id: 'confirm.title',
            defaultMessage: 'Are you sure?',
          }}
          isOpen={isConfirmOneDialogOpen}
          onToggleDialog={toggleConfirmOneDialog}
          onConfirm={triggerGithubActions}
          variantRightButton="success-light"
          iconRightButton={<Check />}
        />
        <Flex background="buttonPrimary600" hasRadius>
          <Button
            onClick={toggleConfirmOneDialog}
            variant="default"
            loading={loadingTriggerButton}
            startIcon={<Plus />}
          >
            {PRIMARY_ACTION_BUTTON}
          </Button>
          <Flex height="15px" width="1px" background="primary500"></Flex>
          <Menu.Root>
            <Menu.Trigger style={{ background: 'inherit', borderRadius: 'inherit' }}>
              <Button variant="default" style={{ minWidth: 'unset', padding: '8px 12px' }}>
                <More />
              </Button>
            </Menu.Trigger>
            <Menu.Content>
              <Menu.Item onSelect={toggleConfirmAllDialog}>
                {TRIGGER_ALL_WORKFLOWS_BUTTON}
              </Menu.Item>
            </Menu.Content>
          </Menu.Root>
        </Flex>
        <ConfirmDialog
          bodyText={{
            id: 'confirm.message',
            defaultMessage: CONFIRM_MSG,
          }}
          title={{
            id: 'confirm.title',
            defaultMessage: 'Are you sure?',
          }}
          isOpen={isConfirmAllDialogOpen}
          onToggleDialog={toggleConfirmAllDialog}
          onConfirm={triggerAllGithubActions}
          variantRightButton="success-light"
          iconRightButton={<Check />}
        />
      </Flex>
    );
  }

  if (isWorkflowsFetching) {
    return (
      <Layouts.Root>
        <Page.Main>
          <Page.Title>{TITLE}</Page.Title>
          <PageLoading />
        </Page.Main>
      </Layouts.Root>
    );
  }

  if (!hasWorkflows) {
    return (
      <Layouts.Root>
        <Page.Main>
          <Page.Title>{TITLE}</Page.Title>
          <Layouts.Header
            title={HEADER_TITLE}
            subtitle={HEADER_SUBTITLE}
          />
          <Layouts.Content>
            {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={() => { setToastToggle(false); }} />}
            <Box background="neutral0" shadow="tableShadow" hasRadius width="100%">
              <EmptyStateLayout
                icon={<EmptyDocuments width="160px" />}
                content={EMPTY_STATE_CONTENT}
                action={(
                  <Button
                    variant="secondary"
                    startIcon={<Plus />}
                    onClick={() => { navigate(`/settings/${pluginId}`); }}
                  >
                    {EMPTY_STATE_ACTION}
                  </Button>
                )}
              />
            </Box>
          </Layouts.Content>
        </Page.Main>
      </Layouts.Root>
    );
  }

  return (
    <Layouts.Root>
      <Page.Main>
        <Page.Title>{TITLE}</Page.Title>
        <Layouts.Header
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          primaryAction={<Actions />}
        />
        <Layouts.Content>
          {toastToggle && <ToastMsg {...toastMsg} closeToastHandler={() => { setToastToggle(false); }} />}
          <Flex gap={3} alignItems="start" width="100%" overflowX="auto" direction="column">
            <Flex
              gap={3}
              background="neutral0"
              shadow="tableShadow"
              hasRadius
              padding={4}
              alignItems="start"
              overflowX="auto"
            >
              {workflows.map((workflow, index) => {
                if (!selectedWorkflow && workflows[0].documentId) {
                  setSelectedWorkflow(workflows[0].documentId);
                }
                return (
                  <Button
                    onClick={() => { if (workflow.documentId) handleSelectWorkflow(workflow.documentId); }}
                    variant={selectedWorkflow === workflow.documentId ? 'primary' : 'ghost'}
                    size="L"
                    loading={isWorkflowsFetching}
                    width="100%"
                    key={workflow.documentId ?? index}
                  >
                    <p
                      style={{
                        width: '100%',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {workflow.workflow}
                    </p>
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                size="L"
                onClick={() => { navigate(`/settings/${pluginId}`); }}
              >
                <Plus />
              </Button>
            </Flex>
            <Box background="neutral0" shadow="tableShadow" hasRadius width="100%">
              {isLoading || !data.workflow_runs
                ? (
                    <Flex
                      width="100%"
                      justifyContent="center"
                      alignItems="center"
                      paddingTop="5em"
                      paddingBottom="5em"
                    >
                      <PageLoading />
                    </Flex>
                  )
                : (
                    <>
                      <Table colCount={6} rowCount={data.workflow_runs.length}>
                        <Thead>
                          <Tr>
                            {THEAD_ITEMS.map((title, i) => (
                              <Th key={i}>
                                <Typography variant="sigma">{title}</Typography>
                              </Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data.workflow_runs.map(
                            ({
                              id,
                              conclusion,
                              name,
                              run_number,
                              run_started_at,
                              html_url,
                              updated_at,
                              created_at,
                            }) => {
                              return (
                                <CustomRow
                                  key={id}
                                  id={id}
                                  workflowId={selectedWorkflow || '0'}
                                  conclusion={conclusion}
                                  name={name}
                                  run_number={run_number}
                                  run_started_at={run_started_at}
                                  html_url={html_url}
                                  updated_at={updated_at}
                                  created_at={created_at}
                                />
                              );
                            },
                          )}
                        </Tbody>
                      </Table>
                      <Flex marginTop={3} paddingBottom={4} direction="column" alignItems="center" width="100%">
                        <Pagination
                          page={page}
                          setPage={handleSetPage}
                          numberOfItems={numberOfItems}
                          maxPerPage={maxPerPage}
                        />
                      </Flex>
                    </>
                  )}
            </Box>
          </Flex>
        </Layouts.Content>
      </Page.Main>
    </Layouts.Root>
  );
}

export default App;
