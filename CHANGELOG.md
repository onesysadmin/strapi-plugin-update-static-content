# Changelog

All notable changes to this project will be documented in this file.

## [5.0.4] - 2024

### Added
- Support for multiple workflow configurations
- AES-256-GCM encryption for secure token storage
- Pagination for workflow history (20 runs per page)
- Download workflow logs functionality
- Integration with Strapi's built-in permission system

### Changed
- Migrated to Strapi v5
- Enhanced security with encrypted token management
- Improved UI/UX with modern Strapi Design System

### Security
- Implemented AES-256-GCM encryption for GitHub Personal Access Tokens
- Added encrypted token storage in database
- Tokens are decrypted on-the-fly when communicating with GitHub API
