import type { Core } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';
import { queryPluginConfig, queryPluginConfigId } from '../utils/queryPluginConfig';
import { validateConfig } from '../validators/validateConfig';
import { encrypt } from '../utils/crypto';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getPluginConfig: async (ctx) => {
    try {
      const pluginConfig = await queryPluginConfig(strapi);
      ctx.body = pluginConfig.map((c) => {
        return {
          id: c.id,
          documentId: c.documentId,
          githubToken: c.githubToken.replace(/./g, '*'),
          githubAccount: c.githubAccount,
          repo: c.repo,
          workflow: c.workflow,
          branch: c.branch,
        };
      });
    } catch {
      ctx.status = 500;
      ctx.body = [];
    }
  },

  getPluginConfigById: async (ctx) => {
    try {
      const { id } = ctx.params;
      const pluginConfig = await queryPluginConfigId(strapi, id);
      ctx.body = {
        id: pluginConfig.id,
        githubToken: pluginConfig.githubToken.replace(/./g, '*'),
        githubAccount: pluginConfig.githubAccount,
        repo: pluginConfig.repo,
        workflow: pluginConfig.workflow,
        branch: pluginConfig.branch,
      };
    } catch {
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to fetch config',
      };
    }
  },

  deletePluginConfigById: async (ctx) => {
    try {
      const { id } = ctx.params;
      await strapi.documents(`plugin::${pluginId}.config`).delete({
        documentId: id,
      });
      ctx.body = {
        success: true,
        message: 'Config deleted successfully',
      };
    } catch {
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to delete config',
      };
    }
  },

  updatePluginConfig: async (ctx) => {
    try {
      const { body } = ctx.request;

      const sanitizedBody = await validateConfig(body);

      const encryptionKey = strapi.plugin(pluginId).config('ENCRYPTION_KEY');
      if (typeof encryptionKey !== 'string') {
        ctx.status = 500;
        ctx.body = {
          error: 'ENCRYPTION_KEY not found in server config',
        };
        return;
      }

      sanitizedBody.githubToken = encrypt(sanitizedBody.githubToken, encryptionKey);

      await strapi.documents(`plugin::${pluginId}.config`).create({
        data: sanitizedBody,
      });
      ctx.body = {
        success: true,
        message: 'Config updated successfully',
      };
    } catch {
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to update config',
      };
    }
  },
});
