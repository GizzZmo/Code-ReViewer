<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it with automated GitHub workflows.

View your app in AI Studio: https://ai.studio/apps/drive/1TXBuFc-IoDqxqApAfjy_7bLfKswUVwXh

## 🚀 Quick Deploy

**Automated deployment with GitHub workflows is now available!**

1. **Add your API key** to repository secrets (`GEMINI_API_KEY`)
2. **Push to main** - automatic deployment to GitHub Pages
3. **Create releases** with `git tag v1.0.0`

📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

## 🔧 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Gemini API key
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## 🤖 GitHub Workflows

This repository includes comprehensive GitHub Actions workflows:

- **🔄 CI/CD** - Automated testing and building
- **🚀 Deployment** - GitHub Pages and custom deployments  
- **📦 Release Management** - Automated releases and packaging
- **🔒 Security** - Secret validation and security scanning
- **🌍 Multi-Environment** - Staging and production deployments

📖 See [.github/workflows/README.md](.github/workflows/README.md) for detailed workflow documentation.
