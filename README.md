<div align="center">
  <img alt="Logo" src="./apps/web/src/assets/logo.svg" height="45" width="auto">
</div>

<br/>

Welcome to the project repository for the One Engage website! This project is set up as a monorepo using TurboRepo. 💪

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Setup](#development-setup)
3. [Folder Structure](#folder-structure)

## Prerequisites

You must have the following tools installed:

- Node.js (v20.x)
- Git
- MongoDB Atlas Connection String

## Development Setup

To get started with the project, follow these steps:

1. Clone the repository.
2. Switch to `main` git branch.
3. To setup the repository run `pnpm run setup`.
4. Create a `.env` file web, server directories in the apps directory. fill in the required environment variables as per the `.env.example` files.
5. To start the development server, run `pnpm dev`.

Please note that this project uses `pnpm` as the package manager. It is required to use `pnpm` for installing and managing dependencies.

Additionally, pre-commit hooks have been set up using [husky](https://typicode.github.io/husky/#/), which runs type checking before committing code changes. It is recommended to leave these hooks enabled, but if necessary, you can bypass them by running `git commit` with the `--no-verify` flag.

## Folder Structure

The project follows a monorepo structure utilizing TurboRepo:

```bash
┌── apps
│   ├── web                  #  Client / Dashboard application built with Next js
│   └── server               # Server-side application using Node.js, Express
└── packages
    └── tsconfig             # Shared tsconfig
```

Each project within the `apps` directory is an independent application with its own `package.json` and dependencies.
The `packages` directory contains shared custom packages utilized by these applications.
