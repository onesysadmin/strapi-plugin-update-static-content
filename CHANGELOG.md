# Changelog

All notable changes to this project will be documented in this file.

## [5.1.0] - 2026-01-04

### Changed
- Replaced button-based workflow selector with a dropdown (SingleSelect) component for better UX and scalability
- Added "Select Workflow" label and placeholder to workflow selector
- Workflow selection now uses a compact dropdown menu instead of horizontal buttons

## [5.0.8] - 2026-01-04

### Fixed
- Fixed AbortError console error when loading the workflow listing screen
- Fixed Cancel button not closing confirmation dialogs
- Improved workflow initialization to prevent race conditions

## [5.0.7]

### Fixed
- Fixed npm package checksum mismatch issue when installing version 5.0.6
- Improved .npmignore configuration to ensure consistent package publishing

## [5.0.4]

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
