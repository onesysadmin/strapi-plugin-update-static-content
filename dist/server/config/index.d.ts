type Validator = Partial<{
    owner: string;
    repo: string;
    branch: string;
    workflowId: string;
    githubToken: string;
}>;
declare const _default: {
    default: {};
    validator({ owner, repo, branch, workflowId, githubToken }: Validator): void;
};
export default _default;
