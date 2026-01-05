export default interface Config {
    id?: number;
    documentId?: string;
    description: string;
    branch: string;
    githubToken: string;
    githubAccount: string;
    repo: string;
    workflow: string;
};