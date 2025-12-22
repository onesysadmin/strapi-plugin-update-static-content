import { StrapiApp } from '@strapi/strapi/admin';
declare const _default: {
    register(app: StrapiApp): void;
    bootstrap(app: StrapiApp): void;
    registerTrads({ locales }: {
        locales: string[];
    }): Promise<({
        data: Record<string, string>;
        locale: string;
    } | {
        data: {};
        locale: string;
    })[]>;
};
export default _default;
