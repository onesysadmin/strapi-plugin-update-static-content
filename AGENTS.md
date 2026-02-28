# AGENTS

Strapi v5 plugin that lets users trigger GitHub Actions workflows from the Strapi admin panel. Supports multiple workflow configs, AES-256-GCM token encryption, run history, log downloads, and permission-based access control.

## Stack

- Strapi v5 (≥5.33.0), TypeScript, React 18, Strapi Design System v2
- Build: `@strapi/sdk-plugin` | Lint: ESLint TypeScript + Stylistic
- Node.js 20.19–24 | Published to GitHub Packages (`@onesysadmin` scope)

## Key Constraints

- `ENCRYPTION_KEY` env var required (32-byte base64 AES key) — see `docs/configuration.md`
- All tokens must be encrypted with AES-256-GCM; never stored or logged in plain text
- Use `@strapi/design-system` components in all frontend work
- Every change requires: version bump + `CHANGELOG.md` entry + docs update

## Load Additional Context

Load the relevant doc before making changes:

| Task | Read |
|---|---|
| API / endpoint changes | `docs/api.md` |
| Config, env vars, troubleshooting | `docs/configuration.md` |
| Project structure, dev commands, component patterns | `docs/architecture.md` |
| Versioning, git workflow, release process, coding standards, **dependency upgrade constraints** | `docs/contributing.md` |

## References

- [Strapi Plugin SDK](https://docs.strapi.io/dev-docs/plugins)
- [Strapi Design System](https://design-system.strapi.io/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
