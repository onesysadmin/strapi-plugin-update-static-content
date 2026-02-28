# Update Static Content - Strapi v5

<p align="center">Update your statically generated site with github actions (more coming on the way).</p>

> **⚠️ Version 5.0.0 and above** - This version is compatible with **Strapi v5** only. For Strapi v4, please use version 3.x.

---

<p align="center" width="100%">
  <img alt="strapi plugin update static content logo" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/logo/strapi-plugin-update-static-content.png"/>
</p>

## Plugin Previews

Plugin Settings

<p align="center" width="100%">
  <img alt="strapi plugin update static content configuration" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/previews/plugin-config.png"/>
</p>

Plugin Page

<p align="center" width="100%">
  <img alt="strapi plugin update static content plugin" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/previews/plugin-page.png"/>
</p>

---

## Features

- **Secure Token Storage** - GitHub tokens are encrypted using AES-256-GCM encryption
- **Multiple Workflows** - Configure and manage multiple GitHub Action workflows
- **Edit Workflows** - Modify workflow configurations without exposing sensitive tokens
- **Workflow Descriptions** - Add friendly names to workflows for easy identification
- **Trigger Workflows** - Manually trigger individual workflows or all workflows at once
- **Workflow History** - View workflow run history with pagination (20 runs per page)
- **Download Logs** - Download workflow run logs directly from the admin panel
- **Permission System** - Granular access control via Strapi's built-in permission system
- **Easy Configuration** - User-friendly UI for adding and managing workflow configurations

## Installation

This package is hosted on GitHub Packages. Configure npm to use GitHub Packages for the `@onesysadmin` scope:

Create or update your `.npmrc` file in your project root:

```
@onesysadmin:registry=https://npm.pkg.github.com
```

Then install the plugin:

```bash
yarn add @onesysadmin/strapi-plugin-update-static-content
# OR
npm i @onesysadmin/strapi-plugin-update-static-content
```

> **Note:** The package registry is publicly accessible and does not require authentication.

## Plugin Configuration

### 1. Generate an Encryption Key

```bash
openssl rand -base64 32
```

### 2. Add Environment Variables

```env
ENCRYPTION_KEY=your_generated_base64_key_here
```

### 3. Enable the Plugin

Add to `config/plugins.js` (or `.ts`):

```javascript
module.exports = ({ env }) => ({
  'update-static-content': {
    enabled: true,
    config: {
      ENCRYPTION_KEY: env('ENCRYPTION_KEY'),
    },
  },
});
```

> In version 5.x, workflow configurations are managed through the admin UI. `ENCRYPTION_KEY` is the only required config parameter.

### 4. Create a GitHub Workflow

Create `.github/workflows/deploy.yml` in your site repository. The workflow **must** include `workflow_dispatch` as a trigger:

```yml
name: Deploy Static Site

on:
  push:
    branches: [main]
  workflow_dispatch: # Required for manual triggering from Strapi

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
        run: echo "Deploying to production..."
```

### 5. Create a GitHub Personal Access Token

Create a PAT (classic) with `repo` scope at [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens).

### 6. Configure Workflows in Strapi Admin

1. Navigate to **Settings → Update Static Content**
2. Click **"Add Workflow"** and fill in the fields:
   - **Workflow Description**: Friendly name (e.g., "Production Deploy")
   - **GitHub Personal Access Token**: Your PAT from step 5
   - **GitHub Owner Account**: Your GitHub username or org name
   - **GitHub Repository**: Repository name (e.g., `my-static-site`)
   - **Workflow Id OR Filename**: Workflow filename (e.g., `deploy.yml`) or ID
   - **Branch**: Branch to trigger on (e.g., `main`)
3. Click **"Save"**

### 7. Edit Existing Workflows

1. Navigate to **Settings → Update Static Content**
2. Click the pencil icon next to the workflow
3. Update fields as needed — leave the token field empty to keep the existing token
4. Click **"Save"**

See [docs/configuration.md](docs/configuration.md) for the full configuration reference and troubleshooting.

## Usage

### Trigger a Single Workflow

1. Navigate to the **Update Static Content** plugin page
2. Select a workflow from the dropdown
3. Click **"Trigger"** and confirm

### Trigger All Workflows

Click **"Trigger All Workflows"** to trigger all configured workflows simultaneously.

### View Workflow History

Each workflow shows recent run history (20 runs per page) with status, conclusion, timestamps, and commit info.

### Download Workflow Logs

Click **"Details"** on any workflow run to download the complete logs as a ZIP file.

## Permissions

Configure at **Settings → Administration Panel → Roles**:

- **Trigger** — View plugin page, trigger workflows, view history and logs
- **Settings** — All Trigger capabilities + add/edit/delete workflow configurations

## API

For programmatic integration, see [docs/api.md](docs/api.md).

## Security

GitHub tokens are encrypted with AES-256-GCM before storage — never stored or logged in plain text. See [docs/api.md](docs/api.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## Roadmap

- [ ] Cancel running workflows manually
- [ ] Support for workflow inputs/parameters
- [ ] Webhook support for automatic deployments
- [ ] Enhanced workflow status notifications
- [ ] Support for other CI/CD providers (GitLab, Bitbucket, etc.)

## Contributing

See [docs/contributing.md](docs/contributing.md) for versioning policy, git workflow, and release process.

## Special Thanks

[Reza from Fing](https://github.com/r6m)
