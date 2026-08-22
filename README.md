# 🥗 PrepYourMeal - Progressive Web App (PWA)

> The official frontend application for the PrepYourMeal ecosystem, built with Vue 3 and Vite.

This repository contains the completely decoupled frontend client. It communicates with the Laravel backend via a REST API and is designed to function as an installable Progressive Web App (PWA) with offline capabilities.

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Tooling:** [Vite](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **API Client:** [Axios](https://axios-http.com/)
- **Language:** TypeScript / JavaScript
- **Code Quality & Security:** ESLint, Prettier, Husky, Commitlint, Gitleaks

---

## 🛠️ Local Development Environment

We use a **100% Docker-based development environment**. You do **not** need to install Node.js or NPM on your local operating system.

We provide a convenient wrapper script (`./pym`) to manage all commands inside the encapsulated `node:22-alpine` container.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running.
- Docker Compose plugin installed.

### 1. Start the Development Server

To start the Vite development server with Hot-Module-Replacement (HMR), simply run:

```bash
./pym up

```

The application will be accessible at: **<http://localhost:5173>**

### 2. Environment Configuration

Create a local environment file to point the frontend to your local Laravel API:

```bash
cp .env.example .env.local

```

### 3. Installing New NPM Packages

To install a new package, use the wrapper script:

```bash
./pym npm install <package-name>

```

### 4. Running Linter & Code Formatting

To manually check your code for errors and format it automatically:

```bash
./pym npm run lint

```

---

## 🛡️ Git Hooks & Security (Shift-Left)

This repository enforces strict code quality and security checks via **Husky** before any code can be committed.

- **Secret Scanning:** `gitleaks` runs via Docker to scan staged files for exposed API keys, tokens, or passwords.
- **Static Analysis & Formatting:** `lint-staged` automatically formats your code with Prettier and checks for errors with ESLint.
- **Conventional Commits:** `commitlint` enforces standardized commit messages (e.g., `feat: add login page`, `fix: resolve auth bug`).

---

## 🏗️ Building for Production

When the application is ready for deployment, the code needs to be compiled and minified.

```bash
./pym npm run build

```

This will generate a `dist/` directory containing the static HTML, CSS, and JS files. In our workflow, this step is handled automatically by the GitHub Actions deployment pipeline before the files are pushed to the Strato production server.

---

## 💻 Recommended IDE Setup

For the best developer experience, we recommend:

- **Editor:** [VS Code](https://code.visualstudio.com/)
- **Extension:** [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Volar)
- Disable the old "Vetur" extension if you have it installed.
