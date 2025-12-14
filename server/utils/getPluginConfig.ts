import type { Core } from '@strapi/strapi';
import pluginId from '../../admin/src/pluginId';

export default function getPluginConfig<T>(strapi: Core.Strapi): T {
  return strapi.plugin(pluginId).config as T;
}
