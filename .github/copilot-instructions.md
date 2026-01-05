# Copilot Instructions for Strapi Plugin Update Static Content

## Project Overview

This is a Strapi v5 plugin that enables users to trigger GitHub Actions workflows directly from the Strapi admin panel. The plugin allows manual triggering of static site rebuilds and deployments, with features including:

- Multiple workflow configuration management
- Secure token storage using AES-256-GCM encryption
- Workflow history viewing with pagination
- Workflow log downloads
- Permission-based access control

## Technology Stack

- **Framework**: Strapi v5
- **Language**: TypeScript
- **Frontend**: React 18 with Strapi Design System v2
- **Build Tool**: Strapi SDK Plugin (@strapi/sdk-plugin)
- **Testing**: None currently configured
- **Linting**: ESLint with TypeScript support

## Project Structure

```
├── admin/               # Frontend admin panel code
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   ├── translations/# i18n translations
│   │   └── utils/       # Utility functions
│   └── tsconfig.json
├── server/              # Backend API code
│   ├── controllers/     # API controllers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── utils/           # Server utilities
│   └── tsconfig.json
├── types/               # Shared TypeScript types
└── package.json
```

## Development Workflow

### Building the Plugin

```bash
npm run build       # Build for production
npm run watch       # Watch mode for development
npm run watch:link  # Watch mode with linking
```

### Linting

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting errors
```

### Code Quality Standards

1. **TypeScript**: All code must be properly typed
2. **ESLint**: Code must pass linting without errors
3. **React Best Practices**: 
   - Use functional components with hooks
   - Avoid setting state during render
   - Use useEffect for side effects
   - Properly manage dependencies in hooks
4. **Strapi Design System**: Use components from @strapi/design-system
5. **Security**: Never expose tokens or sensitive data in plain text

## Semantic Versioning Policy

This project follows [Semantic Versioning 2.0.0](https://semver.org/):

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR** (X.0.0): Incompatible API changes or breaking changes
  - Examples: Strapi version upgrades (v4 → v5), API endpoint removals, required config changes
  
- **MINOR** (0.X.0): New features in a backwards-compatible manner
  - Examples: New workflow features, additional configuration options, new API endpoints
  
- **PATCH** (0.0.X): Backwards-compatible bug fixes
  - Examples: UI fixes, error handling improvements, security patches (non-breaking)

### Version Bumping Process

When making changes, **always**:

1. **Assess the change type**:
   - Breaking change? → Bump MAJOR
   - New feature? → Bump MINOR
   - Bug fix? → Bump PATCH

2. **Update version in multiple files**:
   - `package.json` - Update the `version` field
   - `package-lock.json` - Update the `version` field (should match package.json)
   - `CHANGELOG.md` - Add entry under new version header

3. **Update CHANGELOG.md**:
   ```markdown
   ## [X.Y.Z] - YYYY-MM-DD
   
   ### Added (for MINOR/MAJOR)
   - New feature description
   
   ### Changed (for MINOR/MAJOR)
   - Changed behavior description
   
   ### Fixed (for PATCH)
   - Bug fix description
   
   ### Security (for security fixes)
   - Security improvement description
   
   ### Breaking Changes (for MAJOR)
   - Breaking change description with migration guide
   ```

4. **Commit message format**:
   ```
   Bump version to X.Y.Z
   
   - Change 1
   - Change 2
   ```

### Examples

**Bug Fixes (PATCH)**: 5.0.7 → 5.0.8
- Fixed AbortError on page load
- Fixed Cancel button not working
- Fixed UI rendering issues
- Fixed error handling

**New Features (MINOR)**: 5.0.8 → 5.1.0
- Added webhook support
- Added workflow input parameters
- Added new API endpoints
- Added notification system

**Breaking Changes (MAJOR)**: 5.1.0 → 6.0.0
- Upgraded to Strapi v6
- Changed API endpoint structure
- Removed deprecated features
- Changed configuration format

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all component props
- Avoid `any` type unless absolutely necessary
- Use proper type guards for runtime checks

### React Components

- Use functional components with hooks
- Destructure props in function parameters
- Use meaningful variable names
- Keep components focused and single-purpose
- Use React.memo for expensive components

### State Management

- Use useState for local component state
- Use useEffect for side effects
- Include all dependencies in useEffect arrays
- Never set state during render
- Use useCallback for event handlers passed as props

### API Integration

- Use useFetchClient from @strapi/strapi/admin
- Handle errors gracefully with try/catch
- Show user-friendly error messages
- Use AbortController for cancellable requests
- Implement loading states

### Security

- Encrypt sensitive data before storage
- Never log tokens or passwords
- Validate all user inputs
- Use Strapi's permission system
- Follow OWASP security guidelines

## Common Tasks

### Before Making Any Changes

**IMPORTANT**: For all updates, always remember to:
1. **Update documentation** - Update CHANGELOG.md, README.md, and any other relevant documentation
2. **Bump version** - Assess the change type and bump the version appropriately (MAJOR, MINOR, or PATCH)
3. **Update both package.json and package-lock.json** - Ensure version numbers match

### Adding a New Component

1. Create component in `admin/src/components/ComponentName/`
2. Create `index.tsx` with TypeScript types
3. Export component
4. Use Strapi Design System components
5. Add translations if needed

### Adding a New API Endpoint

1. Add route in `server/routes/index.ts`
2. Add controller method in `server/controllers/`
3. Add service method in `server/services/`
4. Add permission check
5. Update API documentation in README.md

### Fixing Bugs

1. Identify the root cause
2. Write a minimal fix
3. Test the fix thoroughly
4. **Update CHANGELOG.md** - Add entry under new PATCH version
5. **Bump PATCH version** - Update package.json and package-lock.json
6. Commit with descriptive message

### Adding Features

1. Design the feature
2. Implement backend (if needed)
3. Implement frontend
4. Add translations
5. **Update documentation** - Update README.md with new feature details
6. **Update CHANGELOG.md** - Add entry under new MINOR version
7. **Bump MINOR version** - Update package.json and package-lock.json

## Testing Guidelines

Currently, this project does not have automated tests. When adding tests:

- Use Jest for unit tests
- Use React Testing Library for component tests
- Test critical paths and edge cases
- Maintain test coverage above 70%

## Documentation

- Keep README.md up to date
- Document all public API endpoints
- Include examples in documentation
- Update CHANGELOG.md with every release
- Document breaking changes with migration guides

## Git Workflow

- Create feature branches from main
- Use descriptive branch names (e.g., `fix/abort-error`, `feature/webhooks`)
- Write clear commit messages
- Keep commits focused and atomic
- Squash commits before merging if needed

## Release Process

1. Update version in package.json and package-lock.json
2. Update CHANGELOG.md with changes
3. Commit version bump
4. Tag release with version (e.g., `v5.0.8`)
5. Push to GitHub
6. Trigger publish workflow manually
7. Verify package published to GitHub Packages

## Important Notes

- This plugin is published to GitHub Packages (@onesysadmin scope)
- Minimum Node.js version: 18.0.0
- Maximum Node.js version: 24.x.x
- Compatible with Strapi v5.33.0 and above
- Requires encryption key for secure token storage
- All tokens must be encrypted using AES-256-GCM

## References

- [Strapi Plugin SDK Documentation](https://docs.strapi.io/dev-docs/plugins)
- [Strapi Design System](https://design-system.strapi.io/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
