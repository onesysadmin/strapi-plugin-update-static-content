declare const validateConfig: (body: unknown, errorMessage?: string) => Promise<import("yup/lib/object").AssertsShape<{
    githubToken: import("yup/lib/string").RequiredStringSchema<string, Record<string, any>>;
    githubAccount: import("yup/lib/string").RequiredStringSchema<string, Record<string, any>>;
    repo: import("yup/lib/string").RequiredStringSchema<string, Record<string, any>>;
    workflow: import("yup/lib/string").RequiredStringSchema<string, Record<string, any>>;
    branch: import("yup/lib/string").RequiredStringSchema<string, Record<string, any>>;
}>>;
export { validateConfig };
