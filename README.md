# PrepYourMeal App

> The official Progressive Web App for the PrepYourMeal ecosystem.

## 🚧 Current Status: Routing Infrastructure

Currently, this repository acts as the central traffic router for the shared hosting environment. It contains the unified `.htaccess` file which deployed directly to the server root.

This configuration ensures that:

1. All `/api/*` traffic is routed correctly to the Laravel backend subfolder.
2. All root traffic is prepared for the upcoming Vue.js Single Page Application.

## 🚀 Upcoming: Vue 3 Application

This repository will soon host the Vue 3 (Vite) frontend application.

Once the Vue project is initialized, the `.htaccess` file will be moved into the `public/` directory so it gets automatically compiled into the `dist/` folder during the build process, and the deployment action will be updated accordingly.
