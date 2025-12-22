import type { Core } from '@strapi/strapi';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getPluginConfig: (ctx: any) => Promise<void>;
    getPluginConfigById: (ctx: any) => Promise<void>;
    deletePluginConfigById: (ctx: any) => Promise<void>;
    updatePluginConfig: (ctx: any) => Promise<void>;
};
export default _default;
