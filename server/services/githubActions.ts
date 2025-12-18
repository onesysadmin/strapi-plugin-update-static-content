import { Octokit } from '@octokit/rest';
import { RequestError } from '@octokit/request-error';
import { queryPluginConfig, queryPluginConfigId } from '../utils/queryPluginConfig';
import Config from '../../types/Config';

export interface ErrorResponse {
  status: number;
  statusText: string;
}

export interface SuccessResponse<T = unknown> {
  status: number;
  data: T;
}

export type ServiceResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

function createOctokit(config: Config): Octokit {
  return new Octokit({ auth: config.githubToken });
}

function handleOctokitError(err: unknown): ErrorResponse {
  if (err instanceof RequestError) {
    return { status: err.status, statusText: err.message };
  }
  if (err instanceof Error) {
    return { status: 500, statusText: err.message };
  }
  return { status: 500, statusText: 'Unknown error' };
}

async function getConfig(id: string): Promise<Config | null> {
  const DEFAULT_CONFIG = 0;
  if (id === `${DEFAULT_CONFIG}`) {
    const configs = await queryPluginConfig(strapi);
    return configs[DEFAULT_CONFIG] || null;
  }
  try {
    return await queryPluginConfigId(strapi, id);
  } catch {
    return null;
  }
}

async function history(id: string, page = 1): Promise<ServiceResponse> {
  try {
    const config = await getConfig(id);
    if (!config) {
      return { status: 404, statusText: 'Config not found' };
    }

    const octokit = createOctokit(config);
    const response = await octokit.rest.actions.listWorkflowRuns({
      owner: config.githubAccount,
      repo: config.repo,
      workflow_id: config.workflow,
      branch: config.branch,
      per_page: 20,
      page: page,
    });

    return { status: response.status, data: response.data };
  } catch (err) {
    return handleOctokitError(err);
  }
}

async function trigger(id: string): Promise<ServiceResponse> {
  try {
    const config = await getConfig(id);
    if (!config) {
      return { status: 404, statusText: 'Config not found' };
    }

    const octokit = createOctokit(config);
    const response = await octokit.rest.actions.createWorkflowDispatch({
      owner: config.githubAccount,
      repo: config.repo,
      workflow_id: config.workflow,
      ref: config.branch,
      inputs: {},
    });

    return { status: response.status, data: response.data };
  } catch (err) {
    return handleOctokitError(err);
  }
}

async function triggerAll(): Promise<ServiceResponse[]> {
  const configs = await queryPluginConfig(strapi);
  return Promise.all(
    configs.map(async (config): Promise<ServiceResponse> => {
      try {
        const octokit = createOctokit(config);
        const response = await octokit.rest.actions.createWorkflowDispatch({
          owner: config.githubAccount,
          repo: config.repo,
          workflow_id: config.workflow,
          ref: config.branch,
          inputs: {},
        });
        return { status: response.status, data: response.data };
      } catch (err) {
        return handleOctokitError(err);
      }
    }),
  );
}

async function getLogs(jobId: string, id: string): Promise<string | ErrorResponse> {
  try {
    const config = await getConfig(id);
    if (!config) {
      return { status: 404, statusText: 'Config not found' };
    }

    const octokit = createOctokit(config);
    const response = await octokit.rest.actions.downloadWorkflowRunLogs({
      owner: config.githubAccount,
      repo: config.repo,
      run_id: parseInt(jobId, 10),
      request: { redirect: 'manual' },
    });

    if (response.headers.location) {
      return response.headers.location;
    }

    return { status: 500, statusText: 'No redirect location found' };
  } catch (err: any) {
    // 302 redirect with manual mode may throw - check for location header
    if (err.status === 302 && err.response?.headers?.location) {
      return err.response.headers.location;
    }
    return handleOctokitError(err);
  }
}

export default { history, trigger, getLogs, triggerAll };
