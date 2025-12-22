declare const _default: {
    config: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getPluginConfig: (ctx: any) => Promise<void>;
        getPluginConfigById: (ctx: any) => Promise<void>;
        deletePluginConfigById: (ctx: any) => Promise<void>;
        updatePluginConfig: (ctx: any) => Promise<void>;
    };
    githubActions: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        history: (ctx: any) => Promise<void>;
        trigger: (ctx: any) => Promise<any>;
        triggerAll: (ctx: any) => Promise<void>;
        log: (ctx: any) => Promise<void>;
    };
};
export default _default;
