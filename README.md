# 🥗 PrepYourMeal - Progressive Web App (PWA)

> The official frontend application for the PrepYourMeal ecosystem, built with Vue 3 and Vite.

This repository contains the completely decoupled frontend client. It communicates with the Laravel backend via a REST API and is designed to function as an installable Progressive Web App (PWA) with offline capabilities.

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Tooling:** [Vite](https://vitejs.dev/) & Vite PWA Plugin
- **State Management:** [Pinia](https://pinia.vuejs.org/) (incl. `pinia-plugin-persistedstate` for local offline caching)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Internationalization:** [Vue I18n](https://vue-i18n.intlify.dev/) for dynamic, multi-language support
- **API Client:** [Axios](https://axios-http.com/)
- **Language:** TypeScript / JavaScript
- **Code Quality & Security:** ESLint, Prettier, Husky, Commitlint, Gitleaks, Semgrep, npm audit

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

The application will be accessible at: **[http://localhost:5173](http://localhost:5173)**

### 2. Environment Configuration

Create a local environment file to point the frontend to your local Laravel API:

```bash
cp .env.example .env.local

```

### 3. Using the Wrapper Script

To run package managers or security tools, use the wrapper script:

```bash
./pym npm install <package-name>  # Install new packages
./pym npm run lint                # Run code formatting & ESLint
./pym npm audit                   # Check for vulnerable dependencies

```

---

## 📱 PWA & Offline-First Architecture

This application is built with a mobile-first, native-like user experience in mind:

- **Persistent Cache:** Core data (like recipe overviews and active filters) are cached in the browser's LocalStorage.
- **Stale-while-revalidate:** The app instantly loads cached data on cold starts while silently synchronizing with the API in the background.
- **Smart Routing:** Installation banners are strategically hidden on marketing landing pages to improve user acquisition.

---

## 🛡️ Git Hooks & Security (Shift-Left)

This repository enforces strict code quality and enterprise-grade security checks via **Husky** before any code can be committed. The pipeline consists of 4 robust layers:

1. **Secret Scanning (Gitleaks):** Runs via Docker to block exposed API keys, tokens, or passwords from entering the git history.

2. **Software Composition Analysis (SCA):** Uses `npm audit --audit-level=high` to prevent the introduction of packages with known high-severity vulnerabilities.
3. **Static Application Security Testing (SAST):** Executes `Semgrep` via a temporary Docker container to scan for security anti-patterns in JavaScript/TypeScript and Vue logic.
4. **Static Analysis & Formatting:** `lint-staged` automatically formats your code with Prettier and checks for logical errors with ESLint.

*Note: We also use `commitlint` to enforce standardized conventional commit messages (e.g., `feat: add login page`, `fix: resolve auth bug`).*

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
