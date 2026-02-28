# API Reference

## Base Path

All endpoints: `/api/update-static-content/`

Authentication required on all endpoints. Permissions enforced via Strapi's permission system.

## Configuration Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/config` | List all workflow configurations |
| `GET` | `/config/:id` | Get a specific workflow configuration |
| `POST` | `/config` | Create a new workflow configuration |
| `PUT` | `/config/:id` | Update an existing workflow configuration |
| `DELETE` | `/config/:id` | Delete a workflow configuration |

## Workflow Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/github-actions-history/:id?page=1` | Get paginated run history for a workflow (20/page) |
| `POST` | `/github-actions-trigger/:id` | Trigger a specific workflow |
| `POST` | `/github-actions-trigger/all` | Trigger all configured workflows |
| `GET` | `/github-actions-jobs-log/:id?jobId=xxx` | Get download URL for workflow run logs (ZIP) |

## Adding a New API Endpoint

1. Add route in `server/routes/index.ts`
2. Add controller method in `server/controllers/`
3. Add service method in `server/services/`
4. Add permission check (Trigger or Settings)
5. Update this file with the new endpoint

## Security

### Token Encryption

GitHub PATs are encrypted with **AES-256-GCM** before database storage:

- Key size: 256 bits (32 bytes), base64-encoded
- Each token uses a unique IV (Initialization Vector)
- Authentication tag included for integrity verification
- Tokens are decrypted on-the-fly when calling GitHub's API — never stored in plain text

### Permission-Based Access Control

Two permission levels (configured at **Settings → Administration Panel → Roles**):

| Permission | Capabilities |
|---|---|
| `Trigger` | View plugin page, trigger workflows, view history and logs |
| `Settings` | All Trigger capabilities + add/edit/delete workflow configurations |

Strapi's middleware enforces these at the route level — controllers should not duplicate permission logic.
