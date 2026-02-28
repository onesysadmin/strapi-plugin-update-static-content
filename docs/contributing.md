# Contributing

## Semantic Versioning

This project follows [Semantic Versioning 2.0.0](https://semver.org/): `MAJOR.MINOR.PATCH`

| Type | When | Examples |
|---|---|---|
| MAJOR | Breaking API/config changes | Strapi version upgrade, endpoint removal, required config change |
| MINOR | New backwards-compatible features | New workflow feature, new API endpoint, new config option |
| PATCH | Bug fixes | UI fix, error handling, security patch (non-breaking) |

### Version Bump Checklist

1. Assess change type (MAJOR / MINOR / PATCH)
2. Update `package.json` → `version`
3. Update `package-lock.json` → `version` (must match)
4. Add entry to `CHANGELOG.md` under new version header

### CHANGELOG Entry Format

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Changed behavior description

### Fixed
- Bug fix description

### Security
- Security improvement description

### Breaking Changes
- Breaking change description with migration guide
```

### Commit Message Format

```
Bump version to X.Y.Z

- Change 1
- Change 2
```

## Git Workflow

- Branch from `main`; use descriptive names: `fix/abort-error`, `feature/webhooks`
- Keep commits focused and atomic
- Squash commits before merging if needed
- Write clear commit messages describing the "why"

## Release Process

1. Update version in `package.json` and `package-lock.json`
2. Add `CHANGELOG.md` entry
3. Commit: `Bump version to X.Y.Z`
4. Tag: `git tag vX.Y.Z`
5. Push branch + tag to GitHub
6. Trigger publish workflow manually (GitHub Actions)
7. Verify package published to GitHub Packages (`@onesysadmin` scope)

## Fixing Bugs

1. Identify root cause
2. Write a minimal fix
3. Bump PATCH version
4. Add `CHANGELOG.md` entry under `### Fixed`
5. Commit with descriptive message

## Adding Features

1. Design the feature
2. Implement backend if needed (see `docs/api.md` for adding endpoints)
3. Implement frontend (see `docs/architecture.md` for component conventions)
4. Add i18n translations
5. Update `README.md` with user-facing changes
6. Bump MINOR version
7. Add `CHANGELOG.md` entry under `### Added`

## Dependency Upgrade Constraints

Some dependencies are intentionally held back. Do not upgrade them without first resolving the blocker noted below.

| Package | Current | Blocked at | Reason |
|---|---|---|---|
| `eslint` / `@eslint/js` | `^9.x` | v10 | `eslint-plugin-react` v7 calls `context.getFilename()` which was removed in ESLint v10. There is no v8 of `eslint-plugin-react`. **Do not upgrade eslint to v10 until a version of `eslint-plugin-react` declares support for ESLint v10 in its `peerDependencies`.** |
| `react` / `react-dom` / `@types/react*` | `^18.x` | v19 | Strapi's own `peerDependencies` only allow `^17.0.0 \|\| ^18.0.0`. Hold until Strapi adds React 19 to its peer range. |
| `react-router-dom` | `^6.x` | v7 | Strapi's `peerDependencies` require `react-router-dom@^6`. v7 renames the package to `react-router` and changes all import paths. Hold until Strapi updates its peer range. |
| `react-intl` | `^6.x` | v7/v8 | Strapi SDK locks `react-intl` to a compatible major (currently v6). v8 also drops React 18 support. Hold until Strapi upgrades. |

### When checking if a blocker is resolved

- **`eslint-plugin-react`**: check `peerDependencies` in its `package.json` on npm — it must include `^10` or higher before upgrading eslint.
- **`react` / `react-router-dom` / `react-intl`**: check Strapi's `peerDependencies` at https://www.npmjs.com/package/@strapi/strapi before upgrading.

## Testing

No automated tests currently. When adding tests:

- Unit tests: Jest
- Component tests: React Testing Library
- Target: 70% coverage on critical paths and edge cases
