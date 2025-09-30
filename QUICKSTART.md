# Quick Start Guide

Get up and running with Gemini Code Reviewer in 5 minutes! 🚀

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js** (version 18.x or 20.x) - [Download here](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Google Gemini API Key** - [Get one here](https://ai.google.dev/)
- ✅ **Git** - [Download here](https://git-scm.com/)

### Check Your Setup

```bash
# Verify Node.js installation
node --version
# Should show: v18.x.x or v20.x.x

# Verify npm installation
npm --version
# Should show: 9.x.x or higher

# Verify Git installation
git --version
# Should show: git version 2.x.x
```

## 🚀 Installation (5 Steps)

### Step 1: Clone the Repository

```bash
git clone https://github.com/GizzZmo/Code-ReViewer.git
cd Code-ReViewer
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (React, TypeScript, Vite, etc.)

### Step 3: Get Your API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key (starts with `AIza...`)

### Step 4: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Open .env.local in your editor
# Add your API key:
# GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

**Important**: Never commit `.env.local` to Git!

### Step 5: Start the App

```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

## 🎉 You're Ready!

The app should now be running. You'll see:

```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## 💡 First Code Review

Let's test it with a simple example:

1. **Paste this code** in the left editor:
   ```javascript
   function calculateSum(numbers) {
     var total = 0;
     for (var i = 0; i <= numbers.length; i++) {
       total = total + numbers[i];
     }
     return total;
   }
   ```

2. **Click** the "Review Code" button

3. **Wait** for the AI to analyze (5-10 seconds)

4. **Read** the comprehensive review in the right panel

The AI will identify:
- 🐛 Bug: Off-by-one error in the loop
- ⚡ Performance: Suggestions for optimization
- 📖 Style: Use of `var` instead of `const`/`let`
- 🎯 Best practices: Modern JavaScript alternatives
- 🔒 Security: Input validation suggestions

## 📱 Using the Interface

### Code Editor (Left Panel)
- Paste or type your code
- Supports any programming language
- No length limit (but be reasonable)

### Review Output (Right Panel)
- Shows markdown-formatted review
- Includes syntax-highlighted code examples
- Organized into sections (Bugs, Performance, etc.)

### Review Button (Center)
- Click to start review
- Shows "Reviewing..." during processing
- Disabled while reviewing

## ⚙️ Configuration Options

### Environment Variables

Edit `.env.local` to customize:

```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional
NODE_ENV=development
```

### Customizing Review Prompts

Want to customize what the AI reviews? Edit `services/geminiService.ts`:

```typescript
const systemInstruction = `
  Your custom review instructions here...
  Focus on: security, performance, readability
`;
```

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

## ❓ Troubleshooting

### Problem: API Key Error

**Error**: "API_KEY environment variable not set"

**Solution**:
1. Check that `.env.local` exists
2. Verify it contains `GEMINI_API_KEY=...`
3. Restart the dev server (`Ctrl+C`, then `npm run dev`)

### Problem: Build Errors

**Error**: TypeScript or build errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Problem: Port Already in Use

**Error**: "Port 5173 is already in use"

**Solution**:
```bash
# Use a different port
npm run dev -- --port 3000
```

### Problem: API Connection Issues

**Error**: "Failed to get review from Gemini API"

**Solution**:
1. Check internet connection
2. Verify API key is correct
3. Check [Gemini API status](https://status.cloud.google.com/)
4. Try with a different API key

## 🚀 Next Steps

Now that you're up and running:

1. **📖 Read the Docs**
   - [Full Documentation](README.md)
   - [API Reference](API.md)
   - [Architecture Guide](ARCHITECTURE.md)

2. **🎨 Customize**
   - Modify the UI in `components/`
   - Adjust review prompts in `services/geminiService.ts`
   - Add features!

3. **🚢 Deploy**
   - [Deploy to GitHub Pages](DEPLOYMENT.md#option-1-github-pages-automatic)
   - [Deploy to Vercel](DEPLOYMENT.md#option-2-manual-deployment)
   - [Self-host](DEPLOYMENT.md#option-3-custom-deployment)

4. **🤝 Contribute**
   - [Contributing Guide](CONTRIBUTING.md)
   - [Code of Conduct](CODE_OF_CONDUCT.md)
   - Report bugs or request features

## 💬 Getting Help

Stuck? Here's how to get help:

- 📖 **Documentation**: Check [DOCS.md](DOCS.md) for all guides
- 🐛 **Issues**: [Report a bug](https://github.com/GizzZmo/Code-ReViewer/issues)
- 💬 **Discussions**: [Ask questions](https://github.com/GizzZmo/Code-ReViewer/discussions)
- 🔒 **Security**: [Report vulnerabilities](SECURITY.md)

## 🎯 Tips for Best Results

### Writing Code for Review

✅ **Do**:
- Provide complete, working code
- Include context (function names, comments)
- Specify the programming language in comments
- Test with different code snippets

❌ **Avoid**:
- Incomplete code fragments
- Extremely long files (>1000 lines)
- Code with sensitive data

### Understanding Reviews

The AI provides feedback in 5 categories:

1. **🐛 Bugs & Issues** - Logic errors, edge cases
2. **⚡ Performance** - Optimization opportunities
3. **📖 Readability** - Code style, naming
4. **🎯 Best Practices** - Modern patterns, standards
5. **🔒 Security** - Vulnerabilities, risks

Not all sections appear for every review - it depends on your code!

## ✨ Pro Tips

1. **Start Small**: Test with simple code first
2. **Iterate**: Review the AI's suggestions and apply them
3. **Learn**: Use reviews to learn best practices
4. **Share**: Show examples to your team
5. **Customize**: Adjust the prompt for your needs

## 🎊 Success!

You're now ready to use Gemini Code Reviewer! Start reviewing code and improving your programming skills with AI assistance.

---

**Need more help?** Check the [Documentation Guide](DOCS.md) for all available resources.

**Want to contribute?** Read the [Contributing Guide](CONTRIBUTING.md) to get started.

**Have feedback?** We'd love to hear it! [Open an issue](https://github.com/GizzZmo/Code-ReViewer/issues).

Happy coding! 🚀
