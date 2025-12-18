import type { Core } from '@strapi/strapi';
import { pluginId } from '../../admin/src/pluginId';
import { decrypt } from './crypto';
import Config from '../../types/Config';

function decryptToken(c: Config): Config {
  const githubToken = c.githubToken;
  if (githubToken) {
    const encryptionKey = strapi.plugin(pluginId).config("ENCRYPTION_KEY") as string | undefined | null;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY not found in server config');
    }
    c.githubToken = decrypt(githubToken, encryptionKey);
  }
  return c;
}

export async function queryPluginConfig(strapi: Core.Strapi): Promise<Config[]> {
  try {
    if (!strapi.documents) {
      throw new Error('Document service not found');
    }
    // Document Service returns records with extended metadata, cast to our Config type
    const configs = await strapi.documents('plugin::update-static-content.config').findMany() as unknown as Config[];
    if (!configs || configs.length === 0) {
      return [];
    }
    
    return configs.map(decryptToken);
  }
  catch (err) {
    throw err;
  }
}


export async function queryPluginConfigId(strapi: Core.Strapi, id: string): Promise<Config> {
  try {
    if (!strapi.documents) {
      throw new Error('Document service not found');
    }
    // Document Service returns records with extended metadata, cast to our Config type
    const config = await strapi.documents('plugin::update-static-content.config').findOne({
      documentId: id
    }) as unknown as Config | null;
    
    if (!config) {
      throw new Error('Config not found');
    }
    
    return decryptToken(config);
  }
  catch (err) {
    throw err;
  }
}