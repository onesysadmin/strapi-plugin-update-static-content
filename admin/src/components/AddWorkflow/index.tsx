import { Flex, Link, TextInput, Button, Field, Box } from '@strapi/design-system';
import { useState, ChangeEvent } from 'react';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { Layouts, Page, useFetchClient } from '@strapi/strapi/admin';
import { pluginId } from '../../pluginId';
import { ArrowLeft, Check } from '@strapi/icons';

interface AddWorkflowProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function AddWorkflow({ onCancel, onSuccess }: AddWorkflowProps) {
  const [description, setDescription] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [branch, setBranch] = useState('');
  const [githubAccount, setGithubAccount] = useState('');
  const [repo, setRepo] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { post } = useFetchClient();

  const HEADER_TITLE = 'Add New Workflow';
  const HEADER_SUBTITLE = 'Add a new workflow to update the static content';

  const DESCRIPTION = useFormattedLabel('settings.fields.description');
  const GITHUB_TOKEN = useFormattedLabel('settings.fields.githubtoken');
  const REPO = useFormattedLabel('settings.fields.repo');
  const WORKFLOWID = useFormattedLabel('settings.fields.workflowid');
  const OWNER = useFormattedLabel('settings.fields.owner');
  const BRANCH = useFormattedLabel('settings.fields.branch');

  const HINT_DESCRIPTION = useFormattedLabel('settings.fields.hint.description');
  const HINT_GITHUB_TOKEN = useFormattedLabel('settings.fields.hint.githubtoken');
  const HINT_OWNER = useFormattedLabel('settings.fields.hint.owner');
  const HINT_REPO = useFormattedLabel('settings.fields.hint.repo');
  const HINT_WORKFLOWID = useFormattedLabel('settings.fields.hint.workflowid');
  const HINT_BRANCH = useFormattedLabel('settings.fields.hint.branch');

  const PLACEHOLDER_DESCRIPTION = useFormattedLabel('settings.fields.placeholder.description');
  const PLACEHOLDER_GITHUB_TOKEN = useFormattedLabel('settings.fields.placeholder.githubtoken');
  const PLACEHOLDER_OWNER = useFormattedLabel('settings.fields.placeholder.owner');
  const PLACEHOLDER_REPO = useFormattedLabel('settings.fields.placeholder.repo');
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel('settings.fields.placeholder.workflowid');
  const PLACEHOLDER_BRANCH = useFormattedLabel('settings.fields.placeholder.branch');
  const BUTTON_DETAILS = useFormattedLabel('button.details');

  const BACK_BUTTON = useFormattedLabel('button.back');
  const SAVE_BUTTON = useFormattedLabel('button.save');

  const isFormValid = description && githubToken && githubAccount && repo && workflow && branch;

  const handleSubmit = async () => {
    if (!isFormValid) {
      console.error('Please fill all the fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await post(`/${pluginId}/config`, {
        description,
        githubToken,
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
      <Page.Main aria-busy={isSubmitting}>
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
              disabled={!isFormValid}
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
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root
                name="githubToken"
                required
                hint={(
                  <>
                    {HINT_GITHUB_TOKEN}
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
                  placeholder={PLACEHOLDER_GITHUB_TOKEN}
                  autoComplete="off"
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
