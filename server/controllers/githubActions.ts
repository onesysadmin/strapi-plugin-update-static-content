import type { Core } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  history: async (ctx) => {
    const { id } = ctx.params;
    const { page } = ctx.request.query;
    const response = await strapi.plugin(pluginId).service('githubActions').history(id, page ?? 1);
    ctx.body = response.data;
  },
  trigger: async (ctx) => {
    const { id } = ctx.params;
    const response = await strapi.plugin(pluginId).service('githubActions').trigger(id);
    if (response.status === 422 && response.statusText == 'Unprocessable Entity') {
      return ctx.unprocessableEntity('Unprocessable Entity');
    }
    ctx.body = response.data;
  },
  triggerAll : async (ctx) => {
    const response = await strapi.plugin(pluginId).service('githubActions').triggerAll();
    ctx.body = response.data;
  },
  log: async (ctx) => {
    const { id } = ctx.params;
    const { jobId } = ctx.request.query;
    const response = await strapi.plugin(pluginId).service('githubActions').getLogs(jobId, id);

    // Check if response is an error object
    if (response && typeof response === 'object' && response.status) {
      ctx.status = response.status;
      ctx.body = { error: response.statusText };
      return;
    }

    // Return URL in a JSON object
    ctx.body = { url: response };
  },
});
