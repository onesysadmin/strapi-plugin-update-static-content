import type { Core } from '@strapi/strapi';
import permissions from './permissions';

const PLUGIN_NAME = 'update-static-content';

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Trigger builds',
      uid: permissions.workflows.trigger,
      pluginName: PLUGIN_NAME,
    },
    {
      section: 'plugins',
      displayName: 'Access settings',
      uid: permissions.settings.access,
      pluginName: PLUGIN_NAME,
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
