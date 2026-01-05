import { yup, validateYupSchema } from '@strapi/utils';

const validateConfig = validateYupSchema(
  yup.object({
    description: yup.string().trim().required(),
    githubToken: yup.string().trim().required(),
    githubAccount: yup.string().trim().required(),
    repo: yup.string().trim().required(),
    workflow: yup.string().trim().required(),
    branch: yup.string().trim().required(),
  }),
);

const validateConfigUpdate = validateYupSchema(
  yup.object({
    description: yup.string().trim().required(),
    githubToken: yup.string().trim().optional(),
    githubAccount: yup.string().trim().required(),
    repo: yup.string().trim().required(),
    workflow: yup.string().trim().required(),
    branch: yup.string().trim().required(),
  }),
);

export { validateConfig, validateConfigUpdate };
