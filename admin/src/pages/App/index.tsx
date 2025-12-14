/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Routes, Route } from 'react-router-dom';
import { Page } from '@strapi/strapi/admin';
import pluginId from '../../pluginId';
import PluginPage from '../PluginPage';
import SettingPage from '../SettingPage';
import AddNewWorkflow from '../SettingPage/addWorkflow';

const App = () => {
  return (
    <Routes>
      <Route path={`settings/${pluginId}`} element={<SettingPage />} />
      <Route path={`plugins/${pluginId}`} element={<PluginPage />} />
      <Route path={`settings/${pluginId}/new-workflow`} element={<AddNewWorkflow />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export default App;
