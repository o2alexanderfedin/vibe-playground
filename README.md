# Todo App v1.2.0

A simple todo application that allows users to:
- Add new tasks
- Mark tasks as completed
- Delete tasks

## Features
- Clean, responsive UI
- IndexedDB persistence with localStorage fallback
- Real-time search functionality
- Add tasks with Enter key or button click
- Docker containerization for easy deployment
- Comprehensive nopCommerce technical documentation
- Technical architect profiles and guides

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
- IndexedDB / LocalStorage API
- Docker & Nginx

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
│   ├── ARCHITECTURE.md      # Base technical architecture
│   ├── SEARCH_ARCHITECTURE.md  # Search feature architecture
│   ├── INDEXEDDB_ARCHITECTURE.md  # Database architecture
│   ├── DOCKER_ARCHITECTURE.md  # Docker implementation architecture
│   └── CONTRIBUTING.md      # Contribution guidelines
│
├── Dockerfile            # Docker configuration
├── nginx.conf            # Nginx web server configuration
├── docker-compose.yml    # Docker Compose setup
├── scripts/              # Helper scripts
│   ├── build.sh          # Docker build script
│   ├── run.sh            # Docker run script
│   └── docker-compose-up.sh  # Docker Compose script
│
├── WORKFLOW.md           # Mandatory workflow rules
└── .github/              # GitHub configurations
    └── workflows/        # GitHub Actions workflows
```

## Documentation

- [Technical Architecture](docs/ARCHITECTURE.md) - System design and component diagrams
- [Search Architecture](docs/SEARCH_ARCHITECTURE.md) - Search feature implementation
- [IndexedDB Architecture](docs/INDEXEDDB_ARCHITECTURE.md) - Browser database storage
- [Docker Architecture](docs/DOCKER_ARCHITECTURE.md) - Containerization architecture
- [Contribution Guidelines](docs/CONTRIBUTING.md) - GitFlow process and coding standards
- [Workflow Rules](WORKFLOW.md) - **Mandatory** process for all project tasks
- [Documentation Process](docs/DOCUMENTATION_PROCESS.md) - Documentation creation methodology
- [nopCommerce Documentation](docs/nopcommerce/index.md) - Comprehensive technical documentation
- [Technical Architect Profiles](docs/profiles/index.md) - Architect role guides and templates

## Project Rules

1. **Every task must start with a technical architecture document**
2. **Architecture documents must include Mermaid diagrams**
3. **All work must follow the GitFlow workflow with main branch**

## Usage

### Running Locally
1. Open `src/index.html` in your browser
2. Add new tasks using the input field
3. Click on a task to mark it as completed
4. Click the Delete button to remove a task

### Running with Docker

#### Using Docker Compose (Recommended)
```bash
# Start the container
./scripts/docker-compose-up.sh

# Access the app at http://localhost:8080
```

#### Using Docker Directly
```bash
# Build the Docker image
./scripts/build.sh

# Run the container
./scripts/run.sh

# Access the app at http://localhost:8080
```

## Development
This project follows the GitFlow workflow. See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details and [WORKFLOW.md](WORKFLOW.md) for mandatory process rules.