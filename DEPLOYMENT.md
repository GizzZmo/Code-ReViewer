# AI Studio Deployment Guide

This guide explains how to deploy your AI Studio app using the included GitHub workflows.

## 🚀 Quick Start

### 1. Setup Repository Secrets
Add your Gemini API key to repository secrets:
1. Go to repository `Settings > Secrets and variables > Actions`
2. Click "New repository secret"
3. Name: `GEMINI_API_KEY`
4. Value: Your Google Gemini API key

### 2. Enable GitHub Pages (Optional)
For automatic GitHub Pages deployment:
1. Go to `Settings > Pages`
2. Source: "GitHub Actions"
3. Save

### 3. Push to Deploy
```bash
git push origin main
```
The workflows will automatically:
- ✅ Build and test your app
- ✅ Deploy to GitHub Pages
- ✅ Create deployment artifacts

## 🔧 Available Deployment Options

### Option 1: GitHub Pages (Automatic)
- **Trigger**: Push to `main` branch
- **URL**: `https://yourusername.github.io/your-repo-name`
- **Setup**: Enable GitHub Pages in repository settings

### Option 2: Manual Deployment
1. Download artifacts from workflow runs
2. Upload to any static hosting service
3. Set environment variables on your hosting platform

### Option 3: Custom Deployment
Edit `.github/workflows/ai-studio.yml` to add custom deployment targets:
```yaml
deploy-custom:
  name: Deploy to Custom Platform
  steps:
  - name: Deploy
    run: |
      # Your deployment commands here
```

## 🎯 Environment-Specific Deployments

### Staging Deployment
```bash
git push origin develop
```
- Automatically deploys to staging environment
- Use for testing before production

### Production Deployment
```bash
git push origin main
```
- Deploys to production environment
- Includes full validation and testing

### Manual Deployment with Environment Selection
1. Go to `Actions` tab
2. Select "AI Studio App Workflow"
3. Click "Run workflow"
4. Choose environment: staging or production

## 🔒 Security Configuration

### Required Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key

### Security Best Practices
- ✅ Never commit API keys to code
- ✅ Use GitHub secrets for sensitive data
- ✅ The `.env.example` file shows required variables
- ✅ Workflows include security scanning

### Setting Up Environment Variables
1. Copy `.env.example` to `.env.local` (for local development)
2. Add your actual API key to `.env.local`
3. Add the same key to GitHub repository secrets

## 📦 Release Management

### Creating a Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

This automatically:
- ✅ Creates a GitHub release
- ✅ Generates changelog
- ✅ Packages deployment-ready files
- ✅ Creates downloadable ZIP with deployment guide

### Release Contents
Each release includes:
- Built application files
- Deployment guide
- Configuration examples
- Documentation

## 🧪 Testing Deployments

### Automatic Testing
The workflows automatically:
- ✅ Test build process
- ✅ Validate file structure
- ✅ Check for security issues
- ✅ Verify deployment artifacts

### Manual Testing
1. **Local Testing**:
   ```bash
   npm run dev
   ```

2. **Build Testing**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Deployment Testing**:
   Use the test-deployment job in pull requests

## 🔍 Monitoring and Troubleshooting

### Check Deployment Status
- **GitHub Actions**: View workflow runs in Actions tab
- **GitHub Pages**: Check Pages section in repository settings
- **Environment Status**: View in Environments section

### Common Issues

#### Build Failures
1. Check Node.js version compatibility
2. Verify all dependencies are listed in `package.json`
3. Check TypeScript errors
4. Review workflow logs

#### Deployment Failures
1. Verify GitHub Pages is enabled
2. Check repository permissions
3. Ensure secrets are configured
4. Review deployment logs

#### API Key Issues
1. Run "Environment Setup" workflow
2. Select "validate-secrets" action
3. Check secret configuration
4. Verify API key format

### Debug Mode
Enable debug logging by adding to workflow:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## 📈 Performance Optimization

### Build Optimization
The workflows automatically:
- ✅ Optimize bundle size
- ✅ Compress assets
- ✅ Generate source maps (development only)
- ✅ Tree-shake unused code

### Monitoring Build Size
- Workflows warn if build exceeds 10MB
- Check build artifacts in workflow logs
- Use bundle analyzers for optimization

## 🌐 Multi-Environment Setup

### Environment Configuration
```yaml
# .github/workflows/ai-studio.yml
environments:
  staging:
    url: https://staging.yourapp.com
  production:
    url: https://yourapp.com
```

### Environment Variables per Environment
Set different secrets for each environment:
- `STAGING_GEMINI_API_KEY`
- `PRODUCTION_GEMINI_API_KEY`

## 📝 Customization

### Custom Build Steps
Add to workflow files:
```yaml
- name: Custom build step
  run: |
    npm run custom-command
```

### Custom Deployment Targets
Add new deployment jobs:
```yaml
deploy-vercel:
  name: Deploy to Vercel
  steps:
  - name: Deploy
    uses: vercel/action@v1
    with:
      token: ${{ secrets.VERCEL_TOKEN }}
```

### Custom Environment Variables
1. Add to repository secrets
2. Reference in workflow:
   ```yaml
   env:
     CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
   ```
3. Update `vite.config.ts` to include the variable

## 🤝 Contributing

When updating workflows:
1. Test in a fork first
2. Update documentation
3. Maintain security practices
4. Test all deployment paths

## 📞 Support

For issues with:
- **Workflows**: Check GitHub Actions documentation
- **AI Studio**: Visit Google AI Studio documentation
- **Deployment**: Review hosting platform documentation
- **This App**: Create an issue in this repository