# GitHub Workflows for AI Studio Apps

This repository includes a comprehensive set of GitHub Actions workflows designed specifically for AI Studio applications. These workflows provide automated building, testing, deployment, and management for apps that integrate with Google's AI Studio platform.

## 🚀 Available Workflows

### 1. **CI (Continuous Integration)** - `.github/workflows/ci.yml`
Runs on every push and pull request to ensure code quality.

**Features:**
- Multi-Node.js version testing (18.x, 20.x)
- TypeScript type checking
- Build verification
- Security audit
- Artifact upload

**Triggers:** Push to `main`/`develop`, Pull requests

### 2. **Deploy to GitHub Pages** - `.github/workflows/deploy.yml`
Automatically deploys your AI Studio app to GitHub Pages.

**Features:**
- Production builds
- GitHub Pages deployment
- Environment variable support
- Artifact management

**Triggers:** Push to `main`, Manual dispatch

### 3. **AI Studio App Workflow** - `.github/workflows/ai-studio.yml`
Comprehensive workflow for AI Studio applications with environment-specific deployments.

**Features:**
- AI Studio metadata validation
- Build size monitoring
- Staging/Production deployments
- Manual deployment controls
- Health checks

**Triggers:** Push, Pull requests, Manual dispatch with environment selection

### 4. **Release Management** - `.github/workflows/release.yml`
Creates releases with packaged deployments.

**Features:**
- Automated changelog generation
- Release package creation
- Deployment guides included
- ZIP distribution with all assets

**Triggers:** Tag push (`v*.*.*`), Manual dispatch

### 5. **Environment Setup** - `.github/workflows/env-setup.yml`
Validates and manages environment configuration and secrets.

**Features:**
- Secret validation
- Environment variable checking
- Demo environment setup
- Security scanning
- .gitignore validation

**Triggers:** Manual dispatch with action selection

## 🔧 Setup Instructions

### 1. Repository Secrets
Add the following secrets to your repository (`Settings > Secrets and variables > Actions`):

- `GEMINI_API_KEY`: Your Google Gemini API key

### 2. Environment Variables
Create a `.env.example` file with:
```env
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

### 3. GitHub Pages (Optional)
If using GitHub Pages deployment:
1. Go to `Settings > Pages`
2. Select "GitHub Actions" as source
3. The deploy workflow will handle the rest

## 📋 Workflow Usage Examples

### Running CI on Feature Branch
```bash
git checkout -b feature/new-functionality
git push origin feature/new-functionality
# Creates a pull request - CI workflow runs automatically
```

### Deploying to Staging
```bash
git push origin develop
# AI Studio workflow deploys to staging automatically
```

### Creating a Release
```bash
git tag v1.0.0
git push origin v1.0.0
# Release workflow creates GitHub release with deployable package
```

### Manual Environment Check
1. Go to `Actions` tab
2. Select "Environment Setup"
3. Click "Run workflow"
4. Choose action: `validate-secrets`, `check-env-vars`, or `setup-demo`

## 🔒 Security Best Practices

### ✅ What These Workflows Do
- ✅ Validate API key format without exposing values
- ✅ Scan for accidentally committed secrets
- ✅ Check .gitignore for security patterns
- ✅ Use GitHub secrets for sensitive data
- ✅ Build artifacts without embedding secrets

### ⚠️ Important Security Notes
- Never commit `.env.local` or `.env` files with real API keys
- Always use GitHub secrets for sensitive configuration
- The workflows include security scanning to catch common mistakes
- Build artifacts are created without embedded secrets in most cases

## 🏗️ Customization

### Adding New Deployment Targets
Edit `.github/workflows/ai-studio.yml`:
```yaml
deploy-custom:
  name: Deploy to Custom Platform
  runs-on: ubuntu-latest
  needs: build
  if: github.ref == 'refs/heads/main'
  
  steps:
  - name: Download build artifacts
    uses: actions/download-artifact@v4
    with:
      name: ai-studio-app
      path: dist/
  
  - name: Deploy to custom platform
    run: |
      # Add your deployment commands here
      echo "Deploying to custom platform..."
```

### Modifying Build Process
Edit the build steps in any workflow:
```yaml
- name: Custom build step
  run: |
    # Add pre-build steps
    npm run custom-prebuild
    
    # Standard build
    npm run build
    
    # Add post-build steps
    npm run custom-postbuild
```

### Adding Environment Variables
Update `vite.config.ts` and add to workflow:
```yaml
env:
  CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
  NODE_ENV: production
```

## 🐛 Troubleshooting

### Build Failures
1. Check the CI workflow logs
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript configuration is correct
4. Check for missing environment variables

### Deployment Issues
1. Verify GitHub Pages is enabled
2. Check repository permissions
3. Ensure secrets are properly configured
4. Review deployment logs in workflow runs

### API Key Problems
1. Run the "Environment Setup" workflow with "validate-secrets"
2. Ensure API key is added to repository secrets
3. Check API key format and permissions
4. Verify Vite configuration includes environment variable handling

## 📊 Monitoring

### Build Status
Monitor your builds with GitHub's built-in status badges:
```markdown
![CI](https://github.com/username/repository/workflows/CI/badge.svg)
![Deploy](https://github.com/username/repository/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

### Deployment Status
Check deployment status in:
- `Actions` tab for workflow runs
- `Environments` section for deployment history
- `Pages` settings for GitHub Pages status

## 🤝 Contributing

When contributing to this workflow setup:
1. Test changes in a fork first
2. Update documentation for any new features
3. Ensure security practices are maintained
4. Add appropriate error handling

## 📝 License

These workflows are provided as-is for AI Studio app development. Customize as needed for your specific requirements.