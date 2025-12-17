import * as pluginPkg from '../../package.json';
import { pluginId } from './pluginId';
import pluginPermissions from './permissions';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';
import { StrapiApp } from '@strapi/strapi/admin';
import PluginIcon from './components/PluginIcon';

const { displayName } = pluginPkg.strapi;

export default {
  register(app: StrapiApp) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: displayName,
      },
      Component: () => import('./pages/App'),
      permissions: pluginPermissions.trigger,
    });

    app.registerPlugin({
      id: pluginId,
      name: pluginId,
    });
  },

  bootstrap(app: StrapiApp) {
    app.addSettingsLink(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.settings.title`,
          defaultMessage: displayName,
        },
      },
      {
        id: `${pluginId}.config`,
        intlLabel: {
          id: `${pluginId}.settings.config`,
          defaultMessage: "Configuration",
        },
        to: pluginId,
        Component: () => import("./pages/Settings"),
        permissions: pluginPermissions.settings,
      },
    );

  },

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
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
      }),
    );

    return Promise.resolve(importedTrads);
  },
};
