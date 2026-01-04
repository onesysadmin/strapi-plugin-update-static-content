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

- 🔐 **Secure Token Storage** - GitHub tokens are encrypted using AES-256-GCM encryption
- 📋 **Multiple Workflows** - Configure and manage multiple GitHub Action workflows
- 🚀 **Trigger Workflows** - Manually trigger individual workflows or all workflows at once
- 📊 **Workflow History** - View workflow run history with pagination (20 runs per page)
- 📥 **Download Logs** - Download workflow run logs directly from the admin panel
- 🔒 **Permission System** - Granular access control via Strapi's built-in permission system
- ⚙️ **Easy Configuration** - User-friendly UI for adding and managing workflow configurations

## Installation

```bash
yarn add @onesysadmin/strapi-plugin-update-static-content
# OR
npm i @onesysadmin/strapi-plugin-update-static-content
```

## Plugin Configuration

### 1. Generate an Encryption Key

The plugin uses AES-256-GCM encryption to securely store GitHub Personal Access Tokens. Generate a 32-byte (256-bit) base64-encoded encryption key:

```bash
openssl rand -base64 32
```

### 2. Add Environment Variables

Add the encryption key to your `.env` file:

```env
ENCRYPTION_KEY=your_generated_base64_key_here
```

### 3. Enable the Plugin

Add the plugin configuration in `config/plugins.js` (or `config/plugins.ts`):

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

**Note:** In version 5.x, workflow configurations are managed through the admin UI, not in the plugin configuration file. The `ENCRYPTION_KEY` is the only required configuration parameter.

### 4. Create a GitHub Workflow

Create a file in your repository at `.github/workflows/deploy.yml`. The workflow **must** include `workflow_dispatch` as a trigger to enable manual triggering from Strapi.

**Example workflow:**

```yml
name: Deploy Static Site

on:
  push:
    branches: [main]
  workflow_dispatch: # Required for manual triggering from Strapi

defaults: # Optional: For monorepo projects, specify the working directory
  run:
    working-directory: ./my-site

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
        run: |
          # Your deployment commands here
          echo "Deploying to production..."
```

### 5. Create a GitHub Personal Access Token

Create a Personal Access Token (classic) on GitHub with the following permissions:

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Strapi Static Site Updates")
4. Select the `repo` scope (Full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't be able to see it again)

> 📖 See more in the [GitHub Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### 6. Configure Workflows in Strapi Admin

Once the plugin is installed and configured:

1. Navigate to **Settings → Update Static Content** in your Strapi admin panel
2. Click **"Add Workflow"**
3. Fill in the workflow configuration:
   - **GitHub Personal Access Token**: Your GitHub PAT from step 5
   - **GitHub Owner Account**: Your GitHub username or organization name
   - **GitHub Repository**: The repository name (e.g., `my-static-site`)
   - **Workflow Id OR Filename**: The workflow filename (e.g., `deploy.yml`) or workflow ID
   - **Branch**: The branch to trigger the workflow on (e.g., `main`)
4. Click **"Confirm"** to save

You can add multiple workflow configurations to manage different sites or deployment targets.

## Usage

### Trigger a Single Workflow

1. Navigate to the **Update Static Content** plugin page from the main menu
2. Find the workflow you want to trigger
3. Click the **"Trigger"** button
4. Confirm the action
5. View the workflow history and status

### Trigger All Workflows

Click the **"Trigger All Workflows"** button to trigger all configured workflows simultaneously.

### View Workflow History

- Each workflow displays its recent run history (20 runs per page)
- Navigate through history using pagination controls
- See run status, conclusion, and timestamps
- View run details including commit information

### Download Workflow Logs

Click the **"Details"** button on any workflow run to download the complete logs as a ZIP file.

## Configuration Reference

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ENCRYPTION_KEY` | Yes | Base64-encoded 32-byte key for encrypting GitHub tokens. Generate with `openssl rand -base64 32` |

### Workflow Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| GitHub Personal Access Token | Yes | GitHub PAT with `repo` scope for accessing the repository |
| GitHub Owner Account | Yes | GitHub username or organization name that owns the repository |
| GitHub Repository | Yes | Repository name (without the owner prefix) |
| Workflow Id OR Filename | Yes | GitHub Actions workflow filename (e.g., `deploy.yml`) or workflow ID |
| Branch | Yes | Git branch to trigger the workflow on (e.g., `main`, `production`) |

## Permissions

The plugin uses Strapi's built-in permission system. Configure permissions at **Settings → Administration Panel → Roles**:

### Available Permissions

- **Trigger**: Allows users to view the plugin page, trigger workflows, and view workflow history
- **Settings**: Allows users to view and modify plugin configuration (add/delete workflows)

Assign these permissions to appropriate roles (e.g., Admin, Editor) to control access to the plugin.

## API Endpoints

If you need to integrate with the plugin programmatically, the following endpoints are available:

### Configuration Endpoints

- `GET /api/update-static-content/config` - Get all workflow configurations
- `GET /api/update-static-content/config/:id` - Get a specific workflow configuration
- `POST /api/update-static-content/config` - Create a new workflow configuration
- `DELETE /api/update-static-content/config/:id` - Delete a workflow configuration

### Workflow Endpoints

- `GET /api/update-static-content/github-actions-history/:id?page=1` - Get workflow run history
- `POST /api/update-static-content/github-actions-trigger/:id` - Trigger a specific workflow
- `POST /api/update-static-content/github-actions-trigger/all` - Trigger all workflows
- `GET /api/update-static-content/github-actions-jobs-log/:id?jobId=xxx` - Get workflow run logs URL

All endpoints require authentication and appropriate permissions.

## Security Features

### Token Encryption

GitHub Personal Access Tokens are encrypted using AES-256-GCM encryption before being stored in the database. This ensures that tokens are never stored in plain text.

- **Algorithm**: AES-256-GCM (Galois/Counter Mode)
- **Key Size**: 256 bits (32 bytes)
- **Encryption**: Each token is encrypted with a unique IV (Initialization Vector) and includes an authentication tag for integrity verification
- **Decryption**: Tokens are decrypted on-the-fly when needed to communicate with GitHub's API

### Permission-Based Access Control

The plugin integrates with Strapi's permission system, ensuring that only authorized users can:
- View and trigger workflows
- Modify plugin configuration
- Access workflow history and logs

## Troubleshooting

### "ENCRYPTION_KEY not found in server config"

Make sure you have:
1. Generated an encryption key with `openssl rand -base64 32`
2. Added it to your `.env` file as `ENCRYPTION_KEY=your_key_here`
3. Configured it in `config/plugins.js` as shown in the configuration section

### "Unprocessable Entity" error when triggering workflow

This error occurs when:
- The workflow doesn't include `workflow_dispatch` as a trigger
- The workflow file doesn't exist in the specified repository
- The branch specified doesn't exist

Solution: Verify your workflow file includes `workflow_dispatch:` in the `on:` section.

### "Config not found" error

This happens when the workflow configuration was deleted or the ID is invalid. Check your workflow configurations in the settings page.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

## Roadmap

- [ ] Cancel running workflows manually
- [ ] Support for workflow inputs/parameters
- [ ] Webhook support for automatic deployments
- [ ] Enhanced workflow status notifications
- [ ] Support for other CI/CD providers (GitLab, Bitbucket, etc.)

## Special Thanks

[Reza from Fing](https://github.com/r6m)
