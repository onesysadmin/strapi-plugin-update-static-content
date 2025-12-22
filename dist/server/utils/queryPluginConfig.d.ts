import type { Core } from '@strapi/strapi';
import Config from '../../types/Config';
export declare function queryPluginConfig(strapi: Core.Strapi): Promise<Config[]>;
export declare function queryPluginConfigId(strapi: Core.Strapi, id: string): Promise<Config>;
