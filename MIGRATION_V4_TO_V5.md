# Migration Guide: Strapi v4 to v5

This document outlines the changes made to upgrade the `strapi-plugin-update-static-content` plugin from Strapi v4 to Strapi v5.

## Overview

The plugin has been successfully migrated to be compatible with Strapi v5. This is a major version update that includes breaking changes in both the backend and frontend code.

## Version Changes

- **Plugin Version**: 3.0.0 → 4.0.0
- **Strapi Compatibility**: v4 → v5
- **Node.js Support**: 18-20 → 18-22

## Key Changes

### 1. Dependencies Updated

#### Design System & Admin
- `@strapi/design-system`: 1.19.0 → ^2.0.0 (stable)
- `@strapi/icons`: 1.19.0 → ^2.0.0 (stable)
- `@strapi/helper-plugin`: Removed (functionality moved to `@strapi/strapi/admin`)
- Added: `@strapi/sdk-plugin`: ^5.3.0
- Added: `@strapi/strapi`: ^5.32.0

#### React & Router
- `react`: ^18.0.0 → ^18.3.1
- `react-dom`: ^18.0.0 → ^18.3.1
- `react-router-dom`: 5.3.4 → ^6.22.0 (major routing changes)
- `styled-components`: 5.3.6 → ^6.1.8

#### TypeScript & Tooling
- `@strapi/typescript-utils`: 4.14.4 → ^5.32.0
- `typescript`: 5.0.4 → 5.3.3
- `eslint`: 8.38.0 → 8.57.0
- `prettier`: 2.8.7 → 3.3.3

### 2. Backend Changes (server/)

#### Entity Service → Document Service
The most significant backend change is the replacement of the Entity Service API with the Document Service API.

**Before (v4):**
```typescript
// Using entityService
await strapi.entityService.findMany('plugin::update-static-content.config');
await strapi.entityService.findOne('plugin::update-static-content.config', id);
await strapi.entityService.create('plugin::update-static-content.config', { data });
await strapi.entityService.delete('plugin::update-static-content.config', id);
```

**After (v5):**
```typescript
// Using documents (Document Service)
await strapi.documents('plugin::update-static-content.config').findMany();
await strapi.documents('plugin::update-static-content.config').findOne({ documentId: id });
await strapi.documents('plugin::update-static-content.config').create({ data });
await strapi.documents('plugin::update-static-content.config').delete({ documentId: id });
```

**Key Points:**
- Replace `strapi.entityService` with `strapi.documents(uid)`
- Use `documentId` parameter instead of direct `id` in queries
- API calls now use method chaining pattern

#### TypeScript Type Changes
**Before (v4):**
```typescript
import type { Strapi } from '@strapi/strapi';
```

**After (v5):**
```typescript
import type { Core } from '@strapi/strapi';
// Use Core.Strapi type
```

#### Permission Registration
**Before (v4):**
```typescript
await strapi.admin.services.permission.actionProvider.registerMany(actions);
```

**After (v5):**
```typescript
await strapi.service('admin::permission').actionProvider.registerMany(actions);
```

### 3. Frontend Changes (admin/src/)

#### Design System v2 Migration

**Layout Components:**
- `BaseHeaderLayout` → `Layouts.Header`
- `Layout` → `Layouts.Root`
- `SettingsPageTitle` → `Page.Title`
- `AnErrorOccurred` → `Page.Error`

**Component Props:**
- `TextInput.HintMessage` → `TextInput.hint`

#### Import Changes
**Before (v4):**
```typescript
import { CheckPagePermissions, useFetchClient } from '@strapi/helper-plugin';
import { BaseHeaderLayout, Layout } from '@strapi/design-system';
```

**After (v5):**
```typescript
import { Layouts, useFetchClient, Page } from '@strapi/strapi/admin';
```

**Key Points:**
- All helper-plugin utilities moved to `@strapi/strapi/admin`
- Design system layouts consolidated under `Layouts` namespace
- Page utilities under `Page` namespace

#### React Router v6 Migration

**Route Structure:**
**Before (v4):**
```typescript
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

<Switch>
  <Route path="/settings/plugin" exact>
    <SettingPage />
  </Route>
</Switch>

const { goBack } = useHistory();
goBack();
```

**After (v5):**
```typescript
import { Routes, Route, useNavigate } from 'react-router-dom';

<Routes>
  <Route path="settings/plugin" element={<SettingPage />} />
</Routes>

const navigate = useNavigate();
navigate(-1);
```

**Key Changes:**
- `Switch` → `Routes`
- Child components passed as `element` prop instead of children
- `useHistory().goBack()` → `useNavigate()(-1)`
- Paths no longer need leading `/` in most contexts

#### Permission Handling
**Before (v4):**
```typescript
export default function ProtectedPage() {
  return (
    <CheckPagePermissions permissions={pluginPermissions.trigger}>
      <PluginPage />
    </CheckPagePermissions>
  );
}
```

**After (v5):**
```typescript
// Permissions are now handled at the route level in the plugin registration
export { PluginPage };
```

Permissions are defined directly in the `register()` function:
```typescript
app.addMenuLink({
  // ...
  permissions: pluginPermissions.trigger,
});
```

#### Plugin Registration
The plugin registration structure has been simplified:

**Before (v4):**
- Required `Initializer` component
- Used `app.registerPlugin()` with `initializer` and `isReady`
- Paths included leading `/`

**After (v5):**
- No `Initializer` needed
- Simplified `app.registerPlugin()` with just `id` and `name`
- Paths don't include leading `/`
- Direct component imports in route definitions

### 4. API and Hook Updates

#### useFetch Hook
Updated to properly handle AbortController in useEffect:

**Before (v4):**
```typescript
const abortController = new AbortController(); // Outside useEffect
useEffect(() => {
  // ...
}, [refetch]);
```

**After (v5):**
```typescript
useEffect(() => {
  const abortController = new AbortController(); // Inside useEffect
  // ...
  return () => abortController.abort();
}, [refetch, url]); // Added url to dependencies
```

## Breaking Changes Summary

1. **Backend**:
   - Entity Service API completely replaced with Document Service API
   - All queries must use `documentId` instead of `id`
   - Type imports changed to `Core.Strapi`
   - Permission registration API changed

2. **Frontend**:
   - React Router v5 → v6 requires complete routing restructure
   - Design System v2 has different component structure
   - All `@strapi/helper-plugin` imports moved to `@strapi/strapi/admin`
   - Permission checking moved from component wrappers to route definitions

3. **Dependencies**:
   - Multiple major version updates require peer dependency compatibility
   - Styled Components v6 (breaking changes from v5)

## Testing Recommendations

After migration, thoroughly test:

1. **Configuration Management**:
   - [ ] Adding new workflow configurations
   - [ ] Viewing existing configurations
   - [ ] Deleting configurations

2. **GitHub Actions Integration**:
   - [ ] Triggering individual workflows
   - [ ] Triggering all workflows
   - [ ] Viewing workflow history
   - [ ] Downloading workflow logs

3. **Permissions**:
   - [ ] Access control for different user roles
   - [ ] Settings page permissions
   - [ ] Plugin page permissions

4. **UI/UX**:
   - [ ] All navigation links work correctly
   - [ ] Form submissions work properly
   - [ ] Error handling displays correctly
   - [ ] Loading states function properly

## Known Issues and Considerations

1. **Type Safety**: Type assertions using `as unknown` were added to handle the transition between Strapi's Document Service return types and the plugin's Config type. These are necessary because the Document Service API returns extended metadata beyond our interface definition. As Strapi v5 type definitions stabilize, these can be refined.

2. **Design System Stable Version**: The plugin now uses stable versions of @strapi/design-system v2 (2.0.2) and @strapi/icons v2 (2.0.2).

3. **Deprecation Warnings**: During npm install, you may see deprecation warnings for transitive dependencies. These are from Strapi's dependencies and don't affect plugin functionality.

4. **Security Vulnerabilities**: Some security vulnerabilities exist in transitive dependencies from @strapi/strapi and @strapi/core packages. These are not introduced by this plugin and should be addressed by the Strapi core team in future releases. The vulnerabilities are:
   - glob package (high severity) - in specific version range used by Strapi
   - Various transitive dependencies from @strapi/core and @strapi/strapi
   
   These do not affect the plugin's functionality and are isolated to development dependencies.

## Migration Checklist for Plugin Users

If you're updating this plugin in your Strapi v5 project:

- [ ] Update your Strapi installation to v5
- [ ] Update the plugin to v4.0.0
- [ ] Verify JWT_SECRET is still configured in your environment
- [ ] Test all GitHub Actions integrations
- [ ] Verify user permissions are properly configured
- [ ] Check that all workflows are accessible

## Additional Resources

- [Strapi v5 Migration Guide](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes)
- [Document Service API](https://docs.strapi.io/cms/migration/v4-to-v5/additional-resources/from-entity-service-to-document-service)
- [Design System v2 Migration](https://design-system-git-main-strapijs.vercel.app/?path=/docs/getting-started-migration-guides-v1-to-v2--docs)
- [React Router v6 Migration](https://reactrouter.com/en/main/upgrading/v5)

## Support

For issues related to this migration, please:
1. Check the [GitHub Issues](https://github.com/everythinginjs/strapi-plugin-update-static-content/issues)
2. Review Strapi v5 documentation
3. Open a new issue with detailed information about your problem

---

**Migration Completed**: December 2024
**Plugin Version**: 4.0.0
**Strapi Version**: 5.0.0+
