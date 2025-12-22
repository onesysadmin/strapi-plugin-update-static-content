declare const _default: {
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
export default _default;
