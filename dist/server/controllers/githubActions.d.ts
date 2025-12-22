import type { Core } from '@strapi/strapi';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    history: (ctx: any) => Promise<void>;
    trigger: (ctx: any) => Promise<any>;
    triggerAll: (ctx: any) => Promise<void>;
    log: (ctx: any) => Promise<void>;
};
export default _default;
