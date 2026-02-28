# Configuration Reference

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ENCRYPTION_KEY` | Yes | Base64-encoded 32-byte key for AES-256-GCM token encryption |

Generate with:
```bash
openssl rand -base64 32
```

Add to `.env`:
```env
ENCRYPTION_KEY=your_generated_base64_key_here
```

Register in `config/plugins.js` (or `.ts`):
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

## Workflow Configuration Fields

| Field | Required | Description |
|---|---|---|
| Workflow Description | Yes | Friendly name (e.g., "Production Deploy") |
| GitHub Personal Access Token | Yes (create) / No (edit) | PAT with `repo` scope. Leave empty on edit to keep existing token. |
| GitHub Owner Account | Yes | GitHub username or organization name |
| GitHub Repository | Yes | Repository name (no owner prefix) |
| Workflow Id OR Filename | Yes | Workflow filename (e.g., `deploy.yml`) or numeric workflow ID |
| Branch | Yes | Git branch to trigger on (e.g., `main`) |

### GitHub PAT Requirements

- Token type: Personal Access Token (classic)
- Required scope: `repo` (Full control of private repositories)
- Create at: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

## Runtime Constraints

- Node.js: 18.0.0 – 24.x.x
- Strapi: v5.33.0 or above
- Package registry: GitHub Packages (`@onesysadmin` scope)

## Troubleshooting

### "ENCRYPTION_KEY not found in server config"

1. Generate a key: `openssl rand -base64 32`
2. Add to `.env`: `ENCRYPTION_KEY=your_key_here`
3. Register in `config/plugins.js` as shown above

### "Unprocessable Entity" when triggering workflow

Caused by one of:
- Workflow file does not include `workflow_dispatch:` in the `on:` section
- Workflow file does not exist in the specified repository
- Specified branch does not exist

Fix: Ensure the workflow YAML includes `workflow_dispatch:` as a trigger.

### "Config not found" error

The workflow configuration was deleted or the ID is invalid. Verify configurations at **Settings → Update Static Content**.
