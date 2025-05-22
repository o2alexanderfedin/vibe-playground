# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-05-22

### Added
- MIT License file
- Comprehensive badges in README
- Improved README documentation with code examples
- Project directory restructuring for better organization
- Index files for each major directory section

### Changed
- Updated license from MIT to AGPL-3.0
- Reorganized project structure:
  - Architecture docs moved to docs/architecture/
  - Workflow docs moved to docs/workflow/
  - Docker files moved to config/docker/
  - Scripts moved to config/scripts/
  - Reports categorized into performance and comparisons
- Updated all file references to reflect new structure
- Enhanced README styling with badges and icons
- Improved scripts to work with the new directory structure

### Fixed
- Docker script paths to work with new directory structure
- References in documentation pointing to old file locations
- GitHub Actions workflow to check correct architecture path

## [1.2.0] - 2025-05-22

### Added
- Branch rename from master to main
- Updated documentation to reflect main branch usage
- Updated GitFlow configuration to use main branch

### Changed
- All references from master to main in documentation
- Git hooks to mention main as primary branch
- Updated project rules to specify main branch workflow

## [1.1.0] - 2025-05-22

### Added
- Technical architect profiles and templates
- nopCommerce comprehensive documentation
- Documentation process documentation

### Changed
- Updated README with links to new documentation

## [1.0.0] - 2025-05-22

### Added
- Basic Todo application functionality
- Add, complete, and delete tasks
- Search functionality with filtering
- IndexedDB storage with localStorage fallback
- Docker containerization with Nginx
- Technical architecture documentation
- GitFlow workflow setup