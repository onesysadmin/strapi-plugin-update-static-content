import { prefixPluginTranslations } from '@strapi/strapi/admin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import pluginPermissions from './permissions';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.displayName;

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const { PluginPage } = await import('./pages/PluginPage');
        return PluginPage;
      },
      permissions: pluginPermissions.trigger,
    });
    
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.settings.title`,
          defaultMessage: name,
        },
      },
      [
        {
          id: pluginId,
          intlLabel: {
            id: `${pluginId}.settings.subtitle.link`,
            defaultMessage: 'Configuration',
          },
          to: `settings/${pluginId}`,
          Component: async () => {
            const { SettingPage } = await import('./pages/SettingPage');
            return SettingPage;
          },
          permissions: pluginPermissions.settings,
        },
      ]
    );

    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;
    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
