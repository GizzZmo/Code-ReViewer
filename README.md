<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🤖 Gemini Code Reviewer

[![CI](https://github.com/GizzZmo/Code-ReViewer/workflows/CI/badge.svg)](https://github.com/GizzZmo/Code-ReViewer/actions)
[![Deploy](https://github.com/GizzZmo/Code-ReViewer/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/GizzZmo/Code-ReViewer/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**An AI-powered code review tool that provides instant, comprehensive feedback on your code using Google's Gemini API**

[🚀 Live Demo](https://gizzmo.github.io/Code-ReViewer/) | [📖 Documentation](DEPLOYMENT.md) | [🤝 Contributing](CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Development](#-development)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

> 💡 **New to the project?** Check out our [Documentation Guide](DOCS.md) to navigate all available docs!

## 🎯 Overview

**Gemini Code Reviewer** is a web-based application that leverages Google's powerful Gemini AI to provide instant, expert-level code reviews. Simply paste your code, and get comprehensive feedback on:

- 🐛 **Bugs & Issues** - Identify logical errors and edge cases
- ⚡ **Performance** - Discover bottlenecks and optimization opportunities
- 📖 **Readability** - Improve code style and naming conventions
- 🎯 **Best Practices** - Learn modern patterns and techniques
- 🔒 **Security** - Detect potential vulnerabilities

Built with React, TypeScript, and Vite for a fast, modern development experience.

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Analysis** - Leverages Gemini 2.5 Flash for intelligent code review
- 💻 **Syntax Highlighting** - Clear code presentation with proper formatting
- 📝 **Markdown Output** - Well-structured, readable feedback
- ⚡ **Real-time Processing** - Fast response times with streaming support
- 🎨 **Modern UI** - Clean, responsive interface built with Tailwind CSS

### Developer Experience
- 🔧 **TypeScript** - Full type safety and autocomplete
- ⚡ **Vite** - Lightning-fast development and builds
- 🎯 **React 19** - Latest React features and optimizations
- 🔄 **Hot Reload** - Instant feedback during development

### DevOps & Deployment
- 🚀 **Automated CI/CD** - GitHub Actions workflows for testing and deployment
- 📦 **Release Management** - Automated releases with changelog generation
- 🌍 **Multi-Environment** - Staging and production deployments
- 🔒 **Security Scanning** - Automated security audits and secret detection
- 📊 **Build Monitoring** - Artifact validation and size tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GizzZmo/Code-ReViewer.git
   cd Code-ReViewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

### Basic Code Review

1. **Paste your code** into the left editor panel
2. **Click "Review Code"** button
3. **View AI feedback** in the right panel with detailed analysis

### Example Review

```javascript
// Paste this code to see a sample review
function calculateSum(arr) {
  var total = 0;
  for (var i = 0; i <= arr.length; i++) {
    total = total + arr[i];
  }
  return total;
}
```

The AI will identify:
- Off-by-one error in the loop
- Use of `var` instead of `const`/`let`
- Missing input validation
- Suggestions for modern JavaScript features

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes | - |
| `NODE_ENV` | Environment mode | ❌ No | `development` |

### Customizing the AI Prompt

Edit `services/geminiService.ts` to customize the review criteria:

```typescript
const systemInstruction = `
  Your custom review instructions here...
`;
```

## 🚀 Deployment

### Quick Deploy to GitHub Pages

1. **Add API key to repository secrets**
   - Go to Settings → Secrets and variables → Actions
   - Add `GEMINI_API_KEY` secret

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **Automatic deployment**
   - GitHub Actions will build and deploy automatically
   - Access at `https://yourusername.github.io/Code-ReViewer`

### Other Deployment Options

- **Vercel**: One-click deploy with automatic builds
- **Netlify**: Drag-and-drop or Git integration
- **Custom Hosting**: Use the `dist/` folder after `npm run build`

📖 See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Development

### Project Structure

```
Code-ReViewer/
├── .github/workflows/     # GitHub Actions workflows
├── components/            # React components
│   ├── CodeEditor.tsx    # Code input component
│   ├── ReviewOutput.tsx  # Review display component
│   ├── Header.tsx        # App header
│   └── icons/            # SVG icon components
├── services/             
│   └── geminiService.ts  # Gemini API integration
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npx tsc --noEmit` | Type check without building |

### Code Quality

```bash
# Type checking
npx tsc --noEmit

# Security audit
npm audit

# Build size analysis
npm run build
```

## 📚 API Reference

### `reviewCode(code: string): Promise<string>`

Main function to review code using Gemini API.

**Parameters:**
- `code` (string): The code snippet to review

**Returns:**
- Promise\<string\>: Markdown-formatted review

**Example:**
```typescript
import { reviewCode } from './services/geminiService';

const review = await reviewCode('function hello() { console.log("Hello"); }');
console.log(review);
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 🤖 GitHub Workflows

This repository includes comprehensive GitHub Actions workflows:

- **🔄 CI/CD** - Automated testing and building on every push
- **🚀 Deployment** - GitHub Pages and custom deployments  
- **📦 Release Management** - Automated releases and packaging
- **🔒 Security** - Secret validation and security scanning
- **🌍 Multi-Environment** - Staging and production deployments

📖 See [.github/workflows/README.md](.github/workflows/README.md) for detailed workflow documentation.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/GizzZmo/Code-ReViewer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/GizzZmo/Code-ReViewer/discussions)
- 📖 **Documentation**: [Full Documentation](DEPLOYMENT.md)

---

<div align="center">
Made with ❤️ by the Code-ReViewer team

⭐ Star us on GitHub — it motivates us a lot!
</div>
