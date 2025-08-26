# CI/CD Workflow Documentation

This repository includes a GitHub Actions CI/CD workflow that automatically tests and builds the Code-ReViewer application.

## Workflow Overview

The CI workflow (`.github/workflows/ci.yml`) runs automatically on:
- Pushes to the `main` branch
- Pull requests targeting the `main` branch

## Jobs

### 1. Test Job (`test`)
Runs the application through comprehensive testing across multiple Node.js versions:

- **Node.js Versions**: 18.x, 20.x, 22.x
- **Steps**:
  - Checkout source code
  - Setup Node.js with npm caching
  - Install dependencies with `npm ci`
  - Run TypeScript type checking with `npx tsc --noEmit`
  - Build the application with `npm run build`
  - Upload build artifacts (only for Node.js 20.x)

### 2. Lint Job (`lint`)
Performs code quality checks:

- **Node.js Version**: 20.x
- **Steps**:
  - Checkout source code
  - Setup Node.js with npm caching
  - Install dependencies with `npm ci`
  - Check for unused dependencies with `depcheck`

## Features

- ✅ **Multi-version testing** ensures compatibility across supported Node.js versions
- ✅ **Dependency caching** speeds up workflow execution
- ✅ **Type safety** verification with TypeScript compiler
- ✅ **Build verification** ensures the application compiles correctly
- ✅ **Artifact storage** preserves build outputs for potential deployment
- ✅ **Dependency hygiene** detects unused dependencies

## Build Artifacts

The workflow uploads build artifacts from the `dist/` directory, which are retained for 30 days and can be downloaded from the GitHub Actions interface.

## Environment Variables

The application uses the `GEMINI_API_KEY` environment variable. In production or deployment scenarios, ensure this is properly configured in your environment.