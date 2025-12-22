declare const _default: {
    register: (_deps: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    destroy: (_deps: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator({ owner, repo, branch, workflowId, githubToken }: Partial<{
            owner: string;
            repo: string;
            branch: string;
            workflowId: string;
            githubToken: string;
        }>): void;
    };
    controllers: {
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
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: (string | {
                name: string;
                config: {
                    actions: string[];
                };
            })[];
        };
    }[];
    services: {
        githubActions: {
            history: (id: string, page?: number) => Promise<import("./services/githubActions").ServiceResponse<unknown>>;
            trigger: (id: string) => Promise<import("./services/githubActions").ServiceResponse<unknown>>;
            getLogs: (jobId: string, id: string) => Promise<string | import("./services/githubActions").ErrorResponse>;
            triggerAll: () => Promise<import("./services/githubActions").ServiceResponse<unknown>[]>;
        };
    };
    contentTypes: {
        config: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    name: string;
                    displayName: string;
                    singularName: string;
                    pluralName: string;
                    tableName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                };
                attributes: {
                    githubToken: {
                        type: string;
                        required: boolean;
                    };
                    branch: {
                        type: string;
                        required: boolean;
                    };
                    githubAccount: {
                        type: string;
                        required: boolean;
                    };
                    repo: {
                        type: string;
                        required: boolean;
                    };
                    workflow: {
                        type: string;
                        required: boolean;
                    };
                };
            };
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
