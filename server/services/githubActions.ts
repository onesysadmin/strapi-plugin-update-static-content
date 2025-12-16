import { queryPluginConfig, queryPluginConfigId } from '../utils/queryPluginConfig';
import axios from 'axios';

async function getConfig(id) {
  // if the id is 0, it means the user is trying to get the first config
  const DEFAULT_CONFIG = 0
  if (id === `${DEFAULT_CONFIG}`) {
    const config = await queryPluginConfig(strapi);
    return config[DEFAULT_CONFIG];
  } else {
    return await queryPluginConfigId(strapi, id);
  }
}

async function history(id: string, page=1) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, workflow, branch, githubToken } = config;
    const perPage = 20;
    const res = await axios.get(
      `https://api.github.com/repos/${githubAccount}/${repo}/actions/workflows/${workflow}/runs?per_page=${perPage}&page=${page}&branch=${branch}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${githubToken}`,
        },
      }
    );
    return res;
  } catch (err: any) {
    return {
      status: err.response?.status || 500,
      statusText: err.response?.statusText || err.message || 'Unknown error',
    };
  }
}

async function trigger(id: string) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, workflow, branch, githubToken } = config;
    const res = await axios.post(
      `https://api.github.com/repos/${githubAccount}/${repo}/actions/workflows/${workflow}/dispatches`,
      {
        ref: branch,
        inputs: {},
      },
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${githubToken}`,
        },
      }
    );
    return res;
  } catch (err: any) {
    return {
      status: err.response?.status || 500,
      statusText: err.response?.statusText || err.message || 'Unknown error',
    };
  }
}

async function triggerAll() {
  try {
    const configs = await queryPluginConfig(strapi);
    return await Promise.all(
      configs.map(async (config) => {
        const { githubAccount, repo, workflow, branch, githubToken } = config;
        return axios.post(
          `https://api.github.com/repos/${githubAccount}/${repo}/actions/workflows/${workflow}/dispatches`,
          {
            ref: branch,
            inputs: {},
          },
          {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `token ${githubToken}`,
            },
          }
        );
      })
    );
  } catch (err: any) {
    return {
      status: err.response?.status || 500,
      statusText: err.response?.statusText || err.message || 'Unknown error',
    };
  }
}

async function getLogs(jobId: string, id: string) {
  try {
    const config = await getConfig(id);
    if (!config) {
      return {
        status: 404,
        statusText: 'Config not found',
      };
    }
    const { githubAccount, repo, githubToken } = config;
    const url = `https://api.github.com/repos/${githubAccount}/${repo}/actions/runs/${jobId}/logs`;

    // Make request with maxRedirects: 0 and validateStatus to capture 302 response
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
      },
      maxRedirects: 0,
      validateStatus: null,
    });

    // Return the Location header which contains the download URL
    if (res.headers?.location) {
      return res.headers.location;
    }

    return {
      status: 500,
      statusText: 'No redirect location found',
    };
  } catch (err: any) {
    return {
      status: err.response?.status || 500,
      statusText: err.response?.statusText || err.message || 'Unknown error',
    };
  }
}

export default { history, trigger, getLogs, triggerAll };
