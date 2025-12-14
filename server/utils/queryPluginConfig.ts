import type { Core } from '@strapi/strapi';
import * as jose from 'jose';
import pluginId from '../../admin/src/pluginId';
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

export async function queryPluginConfig(strapi: Core.Strapi) {
  try {
    if (!strapi.documents) {
      throw new Error('Document service not found');
    }
    const config = await strapi.documents('plugin::update-static-content.config').findMany() as any;
    if (!config) {
      throw new Error('Config not found');
    }
    
    const processedConfig = await Promise.all((config as Config[]).map(decryptToken));
    return processedConfig;
  }
  catch (err) {
    throw err;
  }
}


export async function queryPluginConfigId(strapi: Core.Strapi, id: string) {
  try {
    if (!strapi.documents) {
      throw new Error('Document service not found');
    }
    const result = await strapi.documents('plugin::update-static-content.config').findOne({
      documentId: id
    }) as any;
    const config = result as Config | null;
    if (!config) {
      throw new Error('Config not found');
    }
      const encryptedConfig = await decryptToken(config);
      if (!encryptedConfig) {
        throw new Error('Error encrypting token');
      }
      return encryptedConfig;
  }
  catch (err) {
    throw err;
  }
}