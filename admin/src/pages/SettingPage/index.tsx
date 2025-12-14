import { Layouts } from '@strapi/strapi/admin';
import PageWrapper from '../../components/PageWrapper';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import pluginPermissions from '../../permissions';
import ConfigsTable from '../../components/ConfigsTable';

const SettingPage = () => {
  // Translations
  const PAGE_TITLE = useFormattedLabel('settings.pagetitle');
  const HEADER_TITLE = useFormattedLabel('settings.headers.title');
  const HEADER_SUBTITLE = useFormattedLabel('settings.headers.subtitle');

  return (
    <Layouts.Root>
      <PageWrapper
        baseHeaderLayout={<Layouts.Header title={HEADER_TITLE} subtitle={HEADER_SUBTITLE} />}
        pageTitle={PAGE_TITLE}
      >
        <ConfigsTable />
      </PageWrapper>
    </Layouts.Root>
  );
};

export { SettingPage };
