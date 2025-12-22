declare const _default: {
    githubActions: {
        history: (id: string, page?: number) => Promise<import("./githubActions").ServiceResponse<unknown>>;
        trigger: (id: string) => Promise<import("./githubActions").ServiceResponse<unknown>>;
        getLogs: (jobId: string, id: string) => Promise<string | import("./githubActions").ErrorResponse>;
        triggerAll: () => Promise<import("./githubActions").ServiceResponse<unknown>[]>;
    };
};
export default _default;
