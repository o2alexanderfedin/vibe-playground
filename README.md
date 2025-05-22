# Todo App v1.2.0

[![GitFlow](https://img.shields.io/badge/GitFlow-Enabled-brightgreen.svg)](docs/workflow/index.md)
[![Version](https://img.shields.io/badge/Version-1.2.0-blue.svg)](https://github.com/o2alexanderfedin/vibe-playground/releases)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A simple, organized todo application that allows users to:
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Search through tasks

## Features
- Clean, responsive UI
- IndexedDB persistence with localStorage fallback
- Real-time search functionality
- Add tasks with Enter key or button click
- Docker containerization for easy deployment
- Comprehensive nopCommerce technical documentation
- Technical architect profiles and guides

## Technologies

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- ![IndexedDB](https://img.shields.io/badge/IndexedDB-Storage-blue)

### Infrastructure
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
- ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

## Project Structure
```
├── src/                  # Source code
│   ├── index.html        # Main HTML file
│   ├── css/              # Stylesheet directory
│   │   └── styles.css
│   └── js/               # JavaScript directory
│       ├── app.js        # Main application logic
│       └── db.js         # IndexedDB implementation
│
├── docs/                 # Documentation
│   ├── architecture/     # Architecture documentation
│   │   ├── base/         # Base technical architecture
│   │   └── features/     # Feature-specific architecture
│   │       ├── search/   # Search functionality
│   │       ├── indexeddb/# IndexedDB storage
│   │       └── docker/   # Docker implementation
│   ├── workflow/         # Workflow documentation
│   │   ├── WORKFLOW.md   # Mandatory workflow rules
│   │   ├── CONTRIBUTING.md # Contribution guidelines
│   │   └── DOCUMENTATION_PROCESS.md # Documentation process
│   ├── profiles/         # Technical architect profiles
│   └── nopcommerce/      # nopCommerce documentation
│
├── config/               # Configuration files
│   ├── docker/           # Docker configuration
│   │   ├── Dockerfile    # Docker image configuration
│   │   ├── nginx.conf    # Nginx web server configuration
│   │   └── docker-compose.yml # Docker Compose setup
│   └── scripts/          # Helper scripts
│       ├── build.sh      # Docker build script
│       ├── run.sh        # Docker run script
│       └── docker-compose-up.sh # Docker Compose script
│
├── reports/              # Analysis reports
│   ├── performance/      # Performance analysis
│   └── comparisons/      # Comparative analysis
│
└── .github/              # GitHub configurations
    └── workflows/        # GitHub Actions workflows
```

## Documentation

- [Architecture Documentation](docs/architecture/index.md)
  - [Technical Architecture](docs/architecture/base/ARCHITECTURE.md) - System design and component diagrams
  - [Search Architecture](docs/architecture/features/search/SEARCH_ARCHITECTURE.md) - Search feature implementation
  - [IndexedDB Architecture](docs/architecture/features/indexeddb/INDEXEDDB_ARCHITECTURE.md) - Browser database storage
  - [Docker Architecture](docs/architecture/features/docker/DOCKER_ARCHITECTURE.md) - Containerization architecture

- [Workflow Documentation](docs/workflow/index.md)
  - [Workflow Rules](docs/workflow/WORKFLOW.md) - **Mandatory** process for all project tasks
  - [Contribution Guidelines](docs/workflow/CONTRIBUTING.md) - GitFlow process and coding standards
  - [Documentation Process](docs/workflow/DOCUMENTATION_PROCESS.md) - Documentation creation methodology

- Other Documentation
  - [nopCommerce Documentation](docs/nopcommerce/index.md) - Comprehensive technical documentation
  - [Technical Architect Profiles](docs/profiles/index.md) - Architect role guides and templates
  - [Reports](reports/index.md) - Analysis and performance reports

## Project Rules

We follow strict development workflows to ensure quality and maintainability:

1. **Architecture-First Approach**
   - Every task must start with a technical architecture document
   - All architecture documents must be stored in `docs/architecture/`

2. **Documentation Standards**
   - Architecture documents must include Mermaid diagrams
   - All documentation should be well-structured with clear navigation
   - Cross-references between related documents are encouraged

3. **Workflow Requirements**
   - All work must follow the GitFlow workflow with main branch
   - Feature branches must be created for each new feature
   - Code review is required before merging
   - GitHub Actions automatically verify documentation standards

## Quick Start

### Running Locally
```bash
# Clone the repository
git clone https://github.com/o2alexanderfedin/vibe-playground.git
cd vibe-playground

# Open in browser
open src/index.html
```

### Running with Docker

#### Using Docker Compose (Recommended)
```bash
# Start the container
./config/scripts/docker-compose-up.sh

# Access the app at http://localhost:8888
```

#### Using Docker Directly
```bash
# Build the Docker image
./config/scripts/build.sh

# Run the container
./config/scripts/run.sh

# Access the app at http://localhost:8080
```

### Features
- Add tasks using the input field
- Click on a task to mark it as completed
- Click the Delete button to remove a task
- Use the search box to filter tasks
- Data persists between sessions using IndexedDB (or localStorage as fallback)

## Development

### Getting Started
```bash
# Clone the repository
git clone https://github.com/o2alexanderfedin/vibe-playground.git
cd vibe-playground

# Initialize GitFlow
git flow init -d

# Create a new feature
git flow feature start my-feature

# After making changes
git flow feature finish my-feature
```

This project follows the GitFlow workflow. See [CONTRIBUTING.md](docs/workflow/CONTRIBUTING.md) for details and [WORKFLOW.md](docs/workflow/WORKFLOW.md) for mandatory process rules.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.