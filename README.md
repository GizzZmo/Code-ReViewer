<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it with automated GitHub workflows.

View your app in AI Studio: https://ai.studio/apps/drive/1TXBuFc-IoDqxqApAfjy_7bLfKswUVwXh

## 🚀 Quick Deploy

**Automated deployment with GitHub workflows is now available!**

1. **Build and deploy** - No API key needed at build time!
2. **Push to main** - automatic deployment to GitHub Pages
3. **Create releases** with `git tag v1.0.0`
4. **Configure API key** - Users enter their API key at runtime in the browser

📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

## 🔧 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. **Configure your API key:**
   - Open the app in your browser
   - Enter your Gemini API key in the configuration panel at the top
   - Your API key is stored securely in your browser's local storage
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

**Note:** The API key is no longer required at build time. Users can configure their API key directly in the application UI, and it's stored locally in their browser.

## 🤖 GitHub Workflows

This repository includes comprehensive GitHub Actions workflows:

- **🔄 CI/CD** - Automated testing and building
- **🚀 Deployment** - GitHub Pages and custom deployments  
- **📦 Release Management** - Automated releases and packaging
- **🔒 Security** - Secret validation and security scanning
- **🌍 Multi-Environment** - Staging and production deployments

📖 See [.github/workflows/README.md](.github/workflows/README.md) for detailed workflow documentation.
