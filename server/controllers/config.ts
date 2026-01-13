import type { Core } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';
import { queryPluginConfig, queryPluginConfigId } from '../utils/queryPluginConfig';
import { validateConfig, validateConfigUpdate } from '../validators/validateConfig';
import { encrypt } from '../utils/crypto';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  getPluginConfig: async (ctx) => {
    try {
      const pluginConfig = await queryPluginConfig(strapi);
      ctx.body = pluginConfig.map((c) => {
        return {
          id: c.id,
          documentId: c.documentId,
          description: c.description,
          githubToken: c.githubToken.replace(/./g, '*'),
          githubAccount: c.githubAccount,
          repo: c.repo,
          workflow: c.workflow,
          branch: c.branch,
        };
      });
    } catch (error) {
      strapi.log.error('Failed to fetch plugin configs:', error);
      ctx.status = 500;
      ctx.body = [];
    }
  },

  getPluginConfigList: async (ctx) => {
    try {
      const pluginConfig = await queryPluginConfig(strapi);
      ctx.body = pluginConfig.map((c) => {
        return {
          id: c.id,
          documentId: c.documentId,
          description: c.description,
          githubToken: c.githubToken.replace(/./g, '*'),
          githubAccount: c.githubAccount,
          repo: c.repo,
          workflow: c.workflow,
          branch: c.branch,
        };
      });
    } catch (error) {
      strapi.log.error('Failed to fetch plugin configs:', error);
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
        description: pluginConfig.description,
        githubToken: pluginConfig.githubToken.replace(/./g, '*'),
        githubAccount: pluginConfig.githubAccount,
        repo: pluginConfig.repo,
        workflow: pluginConfig.workflow,
        branch: pluginConfig.branch,
      };
    } catch (error) {
      strapi.log.error(`Failed to fetch plugin config with id ${ctx.params.id}:`, error);
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
    } catch (error) {
      strapi.log.error(`Failed to delete plugin config with id ${ctx.params.id}:`, error);
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
    } catch (error) {
      strapi.log.error('Failed to update plugin config:', error);
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to update config',
      };
    }
  },

  editPluginConfigById: async (ctx) => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;

      const sanitizedBody = await validateConfigUpdate(body);

      const encryptionKey = strapi.plugin(pluginId).config('ENCRYPTION_KEY');
      if (typeof encryptionKey !== 'string') {
        ctx.status = 500;
        ctx.body = {
          error: 'ENCRYPTION_KEY not found in server config',
        };
        return;
      }

      // Build update data (excluding githubToken initially)
      const updateData: {
        description: string;
        githubAccount: string;
        repo: string;
        workflow: string;
        branch: string;
        githubToken?: string;
      } = {
        description: sanitizedBody.description,
        githubAccount: sanitizedBody.githubAccount,
        repo: sanitizedBody.repo,
        workflow: sanitizedBody.workflow,
        branch: sanitizedBody.branch,
      };

      // Only update token if a new one was provided
      if (sanitizedBody.githubToken && sanitizedBody.githubToken.trim() !== '') {
        updateData.githubToken = encrypt(sanitizedBody.githubToken, encryptionKey);
      }
      // If no token provided, don't include githubToken in update to preserve existing encrypted token

      await strapi.documents(`plugin::${pluginId}.config`).update({
        documentId: id,
        data: updateData as never,
      });

      ctx.body = {
        success: true,
        message: 'Config updated successfully',
      };
    } catch (error) {
      strapi.log.error(`Failed to edit plugin config with id ${ctx.params.id}:`, error);
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to edit config',
      };
    }
  },
});
