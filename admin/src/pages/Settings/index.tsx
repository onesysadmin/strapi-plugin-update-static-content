import { useState } from 'react';
import { Button } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { Layouts, Page } from '@strapi/strapi/admin';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import WorkflowsTable from '../../components/WorkflowsTable';
import AddWorkflow from '../../components/AddWorkflow';

const Settings = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');
  const ADD_WORKFLOW_BUTTON = useFormattedLabel('settings.buttons.addWorkflow');

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleBackToList = () => {
    setShowAddForm(false);
  };

  if (showAddForm) {
    return <AddWorkflow onCancel={handleBackToList} onSuccess={handleBackToList} />;
  }

  return (
    <Layouts.Root>
      <Page.Main>
        <Page.Title>{PAGE_TITLE}</Page.Title>
        <Layouts.Header
          title={HEADER_TITLE}
          subtitle={HEADER_SUBTITLE}
          primaryAction={(
            <Button startIcon={<Plus />} onClick={handleAddClick}>
              {ADD_WORKFLOW_BUTTON}
            </Button>
          )}
        />
        <Layouts.Content>
          <WorkflowsTable />
        </Layouts.Content>
      </Page.Main>
    </Layouts.Root>
  );
};

export default Settings;
