import type { Core } from '@strapi/strapi';
import * as jose from 'jose';
import { pluginId } from '../../admin/src/pluginId';
import Config from '../../types/Config';

async function decryptToken(c : Config) {
  const githubToken = c.githubToken;
  if (githubToken) {
    const secret = strapi.plugin(pluginId).config("JWT_SECRET") as string | undefined | null;
    if (!secret) {
      throw new Error('JWT_SECRET not found in server config');
    }
    const decodedSecret = jose.base64url.decode(secret);
    const { payload: decryptedPayload } = await jose.jwtVerify(githubToken, decodedSecret);
    const { githubToken: decryptedGithubToken } = decryptedPayload;
    c.githubToken = decryptedGithubToken as string;
    return c
  }
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
    
    const processedConfig = await Promise.all(configs.map(decryptToken));
    return processedConfig;
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
    
    const decryptedConfig = await decryptToken(config);
    if (!decryptedConfig) {
      throw new Error('Error decrypting token');
    }
    return decryptedConfig;
  }
  catch (err) {
    throw err;
  }
}