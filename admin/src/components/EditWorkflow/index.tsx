import { Flex, Link, TextInput, Button, Field, Box } from '@strapi/design-system';
import { useState, ChangeEvent, useEffect } from 'react';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { Layouts, Page, useFetchClient } from '@strapi/strapi/admin';
import { pluginId } from '../../pluginId';
import { ArrowLeft, Check } from '@strapi/icons';
import Config from '../../../../types/Config';

interface EditWorkflowProps {
  workflowId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditWorkflow({ workflowId, onCancel, onSuccess }: EditWorkflowProps) {
  const [description, setDescription] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [branch, setBranch] = useState('');
  const [githubAccount, setGithubAccount] = useState('');
  const [repo, setRepo] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { get, put } = useFetchClient();

  const HEADER_TITLE = 'Edit Workflow';
  const HEADER_SUBTITLE = 'Edit workflow configuration';

  const DESCRIPTION = useFormattedLabel('settings.fields.description');
  const GITHUB_TOKEN = useFormattedLabel('settings.fields.githubtoken');
  const REPO = useFormattedLabel('settings.fields.repo');
  const WORKFLOWID = useFormattedLabel('settings.fields.workflowid');
  const OWNER = useFormattedLabel('settings.fields.owner');
  const BRANCH = useFormattedLabel('settings.fields.branch');

  const HINT_DESCRIPTION = useFormattedLabel('settings.fields.hint.description');
  const HINT_GITHUB_TOKEN_EDIT = useFormattedLabel('settings.fields.hint.githubtoken.edit');
  const HINT_OWNER = useFormattedLabel('settings.fields.hint.owner');
  const HINT_REPO = useFormattedLabel('settings.fields.hint.repo');
  const HINT_WORKFLOWID = useFormattedLabel('settings.fields.hint.workflowid');
  const HINT_BRANCH = useFormattedLabel('settings.fields.hint.branch');

  const PLACEHOLDER_DESCRIPTION = useFormattedLabel('settings.fields.placeholder.description');
  const PLACEHOLDER_GITHUB_TOKEN_EDIT = useFormattedLabel('settings.fields.placeholder.githubtoken.edit');
  const PLACEHOLDER_OWNER = useFormattedLabel('settings.fields.placeholder.owner');
  const PLACEHOLDER_REPO = useFormattedLabel('settings.fields.placeholder.repo');
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel('settings.fields.placeholder.workflowid');
  const PLACEHOLDER_BRANCH = useFormattedLabel('settings.fields.placeholder.branch');
  const BUTTON_DETAILS = useFormattedLabel('button.details');

  const BACK_BUTTON = useFormattedLabel('button.back');
  const SAVE_BUTTON = useFormattedLabel('button.save');

  const isFormValid = description && githubAccount && repo && workflow && branch;

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        setIsLoading(true);
        const response = await get<Config>(`/${pluginId}/config/${workflowId}`);
        if (response.data) {
          setDescription(response.data.description || '');
          setGithubAccount(response.data.githubAccount);
          setRepo(response.data.repo);
          setWorkflow(response.data.workflow);
          setBranch(response.data.branch);
          // Don't populate githubToken as it's masked on the server
        }
      } catch (error) {
        console.error('Failed to fetch workflow:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflow();
  }, [workflowId, get]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      console.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await put(`/${pluginId}/config/${workflowId}`, {
        description,
        githubToken: githubToken || undefined, // Send undefined if empty to keep existing token
        githubAccount,
        repo,
        workflow,
        branch,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layouts.Root>
      <Page.Main aria-busy={isSubmitting || isLoading}>
        <Page.Title>{HEADER_TITLE}</Page.Title>
        <Layouts.Header
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          navigationAction={(
            <Link tag="button" startIcon={<ArrowLeft />} onClick={onCancel}>
              {BACK_BUTTON}
            </Link>
          )}
          primaryAction={(
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={!isFormValid || isLoading}
              startIcon={<Check />}
              size="S"
            >
              {SAVE_BUTTON}
            </Button>
          )}
        />
        <Layouts.Content>
          <Box
            background="neutral0"
            hasRadius
            shadow="filterShadow"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
          >
            <Flex direction="column" alignItems="stretch" gap={4}>
              <Field.Root name="description" required hint={HINT_DESCRIPTION}>
                <Field.Label>{DESCRIPTION}</Field.Label>
                <TextInput
                  type="text"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value); }}
                  placeholder={PLACEHOLDER_DESCRIPTION}
                  autoComplete="off"
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root
                name="githubToken"
                hint={(
                  <>
                    {HINT_GITHUB_TOKEN_EDIT}
                    {' '}
                    <Link
                      href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                      isExternal
                    >
                      {BUTTON_DETAILS}
                    </Link>
                  </>
                )}
              >
                <Field.Label>{GITHUB_TOKEN}</Field.Label>
                <TextInput
                  type="text"
                  value={githubToken}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setGithubToken(e.target.value); }}
                  placeholder={PLACEHOLDER_GITHUB_TOKEN_EDIT}
                  autoComplete="off"
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="githubAccount" required hint={HINT_OWNER}>
                <Field.Label>{OWNER}</Field.Label>
                <TextInput
                  type="text"
                  value={githubAccount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setGithubAccount(e.target.value); }}
                  placeholder={PLACEHOLDER_OWNER}
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="repo" required hint={HINT_REPO}>
                <Field.Label>{REPO}</Field.Label>
                <TextInput
                  type="text"
                  value={repo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setRepo(e.target.value); }}
                  placeholder={PLACEHOLDER_REPO}
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="branch" required hint={HINT_BRANCH}>
                <Field.Label>{BRANCH}</Field.Label>
                <TextInput
                  type="text"
                  value={branch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setBranch(e.target.value); }}
                  placeholder={PLACEHOLDER_BRANCH}
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="workflow_id" required hint={HINT_WORKFLOWID}>
                <Field.Label>{WORKFLOWID}</Field.Label>
                <TextInput
                  type="text"
                  value={workflow}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setWorkflow(e.target.value); }}
                  placeholder={PLACEHOLDER_WORKFLOWID}
                  disabled={isLoading}
                />
                <Field.Hint />
              </Field.Root>
            </Flex>
          </Box>
        </Layouts.Content>
      </Page.Main>
    </Layouts.Root>
  );
}
