# API Key Migration Guide

## Overview

The application has been updated to store API keys outside the application build. API keys are now configured at **runtime** in the browser, rather than at build time.

## What Changed?

### Before (Build-time Configuration)
- API key was required as an environment variable during build
- API key was embedded into the JavaScript bundle
- Users needed to rebuild the app to change API keys
- Security risk: API keys could be extracted from built files

### After (Runtime Configuration)
- API key is entered by users directly in the browser UI
- API key is stored securely in browser's localStorage
- No rebuild needed to change API keys
- **Zero API keys in source code or build artifacts**

## For Users

### How to Configure Your API Key

1. Open the application in your browser
2. Look for the API key configuration panel at the top of the page
3. Enter your Gemini API key (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))
4. Click "Save"

Your API key is now configured and ready to use!

### Managing Your API Key

- **Update**: Click the "Update" button to change your API key
- **Remove**: Click the "Remove" button to delete your stored API key
- **Security**: Your API key is stored only in your browser and never sent to any server except Google's Gemini API

## For Developers

### No Environment Variables Needed

You no longer need to set `GEMINI_API_KEY` in `.env` files for local development or deployment.

### Building the Application

```bash
npm install
npm run build
```

No API key configuration needed! The build process is now simpler and doesn't require any secrets.

### Deploying the Application

Deploy the built files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server

Users will configure their own API keys when they first use the application.

## Technical Details

### API Key Storage

- **Location**: Browser's localStorage
- **Key**: `gemini_api_key`
- **Scope**: Per-domain (each deployment has separate storage)
- **Persistence**: Survives browser restarts, cleared when browser data is cleared

### Code Changes

1. **New Component**: `components/ApiKeyConfig.tsx`
   - Handles API key input, storage, and management
   - Provides UI for configuration

2. **Updated Service**: `services/geminiService.ts`
   - Retrieves API key from localStorage at runtime
   - Creates AI client dynamically

3. **Simplified Build**: `vite.config.ts`
   - Removed environment variable injection
   - Cleaner, simpler configuration

## Security Benefits

✅ **No secrets in code**: API keys never committed to repository
✅ **No secrets in builds**: Built JavaScript contains no hardcoded keys
✅ **User-controlled**: Each user manages their own API key
✅ **Isolated**: Keys are scoped to the browser and domain
✅ **Transparent**: Users know exactly where their key is stored

## Backwards Compatibility

This change is **not backwards compatible** with the previous build-time configuration method. If you were using environment variables to configure the API key, you'll need to:

1. Remove the `GEMINI_API_KEY` from your `.env` files (optional, but no longer used)
2. Rebuild the application
3. Configure your API key in the browser UI

## Questions?

If you have any questions about this migration, please open an issue in the repository.
