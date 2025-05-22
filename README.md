# Todo App v1.0.0

A simple todo application that allows users to:
- Add new tasks
- Mark tasks as completed
- Delete tasks

## Features
- Clean, responsive UI
- Local storage persistence
- Add tasks with Enter key or button click

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage API

## Project Structure
```
├── src/              # Source code
│   ├── index.html    # Main HTML file
│   ├── css/          # Stylesheet directory
│   │   └── styles.css
│   └── js/           # JavaScript directory
│       └── app.js
│
├── docs/             # Documentation
│   ├── ARCHITECTURE.md  # Technical architecture
│   └── CONTRIBUTING.md  # Contribution guidelines
│
├── WORKFLOW.md       # Mandatory workflow rules
└── .github/          # GitHub configurations
    └── workflows/    # GitHub Actions workflows
```

## Documentation

- [Technical Architecture](docs/ARCHITECTURE.md) - System design and component diagrams
- [Contribution Guidelines](docs/CONTRIBUTING.md) - GitFlow process and coding standards
- [Workflow Rules](WORKFLOW.md) - **Mandatory** process for all project tasks

## Project Rules

1. **Every task must start with a technical architecture document**
2. **Architecture documents must include Mermaid diagrams**
3. **All work must follow the GitFlow workflow**

## Usage
1. Open `src/index.html` in your browser
2. Add new tasks using the input field
3. Click on a task to mark it as completed
4. Click the Delete button to remove a task

## Development
This project follows the GitFlow workflow. See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details and [WORKFLOW.md](WORKFLOW.md) for mandatory process rules.