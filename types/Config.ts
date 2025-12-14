export default interface Config {
    id?: number;
    documentId?: string;
    branch: string;
    githubToken: string;
    githubAccount: string;
    repo: string;
    workflow: string;
};