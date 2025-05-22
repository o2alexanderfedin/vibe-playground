# Contributing to Todo App

This document provides guidelines for contributing to the Todo App project.

## Mandatory Workflow

**IMPORTANT**: All contributors **MUST** follow the rules defined in [WORKFLOW.md](WORKFLOW.md). This is a non-negotiable requirement.

1. Every task must start with a technical architecture document
2. Architecture documents must include Mermaid diagrams
3. All work must follow the GitFlow workflow

## GitFlow Workflow

This project follows the GitFlow branching model:

```mermaid
gitGraph
    commit
    branch develop
    checkout develop
    commit
    branch feature/todo-app
    checkout feature/todo-app
    commit
    commit
    checkout develop
    merge feature/todo-app
    branch feature/organize-folders
    checkout feature/organize-folders
    commit
    checkout develop
    merge feature/organize-folders
    branch release/1.0.0
    checkout release/1.0.0
    commit
    checkout main
    merge release/1.0.0 tag: "v1.0.0"
    checkout develop
    merge release/1.0.0
```

### Branch Structure
- `main`: Production code (formerly master)
- `develop`: Latest development changes
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Urgent fixes for production

### Workflow Steps
1. Create a technical architecture document with Mermaid diagrams
2. Create a feature branch from develop: `git flow feature start feature-name`
3. Make changes, commit, and push
4. Finish the feature: `git flow feature finish feature-name`
5. Create a release branch when ready: `git flow release start x.y.z`
6. Make release-specific changes
7. Finish the release: `git flow release finish x.y.z`

## Technical Documentation

For each significant task or feature:

1. Create a technical architecture document in the `docs/architecture` folder **BEFORE** any implementation
2. Include Mermaid diagrams to visualize:
   - Component relationships
   - Data flow
   - System architecture
   - State transitions
   - Process workflows
3. Document any API changes or new dependencies
4. Update existing architecture documents when making changes to existing components

## Automated Checks

The repository includes GitHub Actions that automatically verify:
- Presence of updated architecture documentation
- Inclusion of Mermaid diagrams
- Proper branch naming conventions

## Coding Standards

- Use consistent indentation (2 spaces)
- Write meaningful commit messages
- Comment complex logic
- Keep functions small and focused
- Follow semantic HTML practices
- Use CSS classes for styling
- Write modular JavaScript