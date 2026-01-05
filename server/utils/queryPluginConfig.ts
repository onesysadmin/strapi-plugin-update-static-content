import type { Core } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';
import { decrypt } from './crypto';
import Config from '../../types/Config';

function decryptToken(c: Config, encryptionKey: string): Config {
  const githubToken = c.githubToken;
  if (githubToken) {
    try {
      c.githubToken = decrypt(githubToken, encryptionKey);
    } catch (error) {
      // If decryption fails, set token to empty string so the config can still be listed
      // The error will surface when trying to use the token (e.g., triggering workflows)
      console.error(`Failed to decrypt token for config ${c.id}:`, error);
      c.githubToken = '';
    }
  }
  return c;
}

export async function queryPluginConfig(strapi: Core.Strapi): Promise<Config[]> {
  if (!strapi.documents) {
    throw new Error('Document service not found');
  }

  const encryptionKey = strapi.plugin(pluginId).config('ENCRYPTION_KEY');
  if (typeof encryptionKey !== 'string') {
    throw new Error('ENCRYPTION_KEY not found in server config');
  }

  // Document Service returns records with extended metadata, cast to our Config type
  const configs = await strapi.documents('plugin::update-static-content.config').findMany() as unknown as Config[];
  if (!configs || configs.length === 0) {
    return [];
  }

  return configs.map((c) => decryptToken(c, encryptionKey));
}

export async function queryPluginConfigId(strapi: Core.Strapi, id: string): Promise<Config> {
  if (!strapi.documents) {
    throw new Error('Document service not found');
  }

  const encryptionKey = strapi.plugin(pluginId).config('ENCRYPTION_KEY');
  if (typeof encryptionKey !== 'string') {
    throw new Error('ENCRYPTION_KEY not found in server config');
  }

  // Document Service returns records with extended metadata, cast to our Config type
  const config = await strapi.documents('plugin::update-static-content.config').findOne({
    documentId: id,
  }) as unknown as Config | null;

  if (!config) {
    throw new Error('Config not found');
  }

  return decryptToken(config, encryptionKey);
}
