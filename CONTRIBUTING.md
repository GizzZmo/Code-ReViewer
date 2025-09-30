# Contributing to Gemini Code Reviewer

First off, thank you for considering contributing to Gemini Code Reviewer! It's people like you that make this tool better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or 20.x installed
- Git installed and configured
- A Google Gemini API key for testing
- Familiarity with React and TypeScript

### Quick Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Code-ReViewer.git
   cd Code-ReViewer
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/GizzZmo/Code-ReViewer.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   # Add your GEMINI_API_KEY to .env.local
   ```

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**Great bug reports include:**
- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, browser)
- Error messages or console logs

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., macOS, Windows, Linux]
 - Node Version: [e.g., 20.x]
 - Browser: [e.g., Chrome, Firefox]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear, descriptive title
- Provide a detailed description of the proposed functionality
- Explain why this enhancement would be useful
- List any alternatives you've considered
- Include mockups or examples if applicable

### Pull Requests

We actively welcome your pull requests! Here's how to submit one:

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure tests pass and code is properly formatted
4. Update documentation as needed
5. Submit your pull request

## 💻 Development Setup

### Environment Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key to `.env.local`

3. **Start Development Server**
   ```bash
   npm run dev
   ```

### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow existing patterns and conventions
   - Add comments for complex logic

3. **Test Your Changes**
   ```bash
   # Type check
   npx tsc --noEmit
   
   # Build
   npm run build
   
   # Preview production build
   npm run preview
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
   
   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a PR from your fork
   - Fill out the PR template
   - Link any related issues

## 📐 Coding Guidelines

### TypeScript Style

- **Use TypeScript features**: Leverage types, interfaces, and generics
- **Explicit types**: Avoid `any`, use proper types
- **Naming conventions**:
  - Components: PascalCase (e.g., `CodeEditor`)
  - Functions/variables: camelCase (e.g., `reviewCode`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_KEY`)
  - Interfaces: PascalCase with descriptive names (e.g., `ReviewOutputProps`)

### React Best Practices

- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Props**: Use TypeScript interfaces for prop types
- **State Management**: Keep state as local as possible
- **Performance**: Use `React.memo`, `useCallback`, `useMemo` when appropriate

### Code Quality

```typescript
// ✅ Good
interface CodeReviewRequest {
  code: string;
  language?: string;
}

const reviewCode = async (request: CodeReviewRequest): Promise<string> => {
  // Implementation
};

// ❌ Avoid
const reviewCode = async (code: any) => {
  // Implementation
};
```

### File Organization

```
components/
  ComponentName/
    ComponentName.tsx
    ComponentName.test.tsx (if tests exist)
    index.ts (if needed for re-exports)
```

### Comments and Documentation

- Add JSDoc comments for public APIs
- Comment complex algorithms or business logic
- Avoid obvious comments
- Keep comments up-to-date with code changes

```typescript
/**
 * Reviews code using the Gemini AI API
 * @param code - The code snippet to review
 * @returns Markdown-formatted review feedback
 * @throws Error if API key is missing or API call fails
 */
export const reviewCode = async (code: string): Promise<string> => {
  // Implementation
};
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npx tsc --noEmit`)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Build passes
- [ ] Type checking passes
```

### Review Process

1. **Automated Checks**: CI workflows must pass
2. **Code Review**: At least one approval required
3. **Testing**: Reviewer tests the changes
4. **Merge**: Maintainer merges the PR

### After Merge

- Your PR will be included in the next release
- You'll be credited in the changelog
- Delete your feature branch

## 🧪 Testing Guidelines

### Manual Testing

1. **Functional Testing**
   - Test the code review feature with various code snippets
   - Verify error handling with invalid inputs
   - Test with different programming languages

2. **UI Testing**
   - Test responsive design on different screen sizes
   - Verify all buttons and interactions work
   - Check for visual glitches

3. **Browser Testing**
   - Test on Chrome, Firefox, Safari
   - Check console for errors

### Build Testing

```bash
# Development build
npm run dev

# Production build
npm run build
npm run preview

# Type checking
npx tsc --noEmit
```

## 📚 Documentation

### Updating Documentation

When making changes, update relevant documentation:

- **README.md**: For user-facing changes
- **DEPLOYMENT.md**: For deployment-related changes
- **API documentation**: For API changes
- **Code comments**: For implementation details

### Documentation Style

- Use clear, concise language
- Include code examples where helpful
- Keep formatting consistent
- Use proper markdown syntax
- Add table of contents for long documents

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### High Priority
- 🐛 Bug fixes
- 📝 Documentation improvements
- ♿ Accessibility enhancements
- 🌐 Internationalization (i18n)

### Feature Ideas
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🔧 Additional configuration options
- 📊 Analytics and metrics
- 🎯 Support for more programming languages

### Technical Improvements
- ✅ Test coverage
- 🔒 Security enhancements
- 📦 Build optimization
- 🚀 CI/CD improvements

## 💡 Tips for Contributors

### Getting Help

- 💬 Join discussions in GitHub Discussions
- 📧 Check existing issues and PRs
- 📖 Read the documentation thoroughly
- 🤔 Don't hesitate to ask questions

### Best Practices

1. **Start Small**: Begin with small contributions to get familiar
2. **Stay Updated**: Regularly sync with upstream
3. **Communicate**: Comment on issues before starting work
4. **Be Patient**: Reviews take time, be responsive to feedback
5. **Learn**: Use contributions as learning opportunities

### Common Pitfalls

- ❌ Not reading existing code/documentation
- ❌ Making too many changes in one PR
- ❌ Not testing thoroughly
- ❌ Ignoring CI failures
- ❌ Not updating documentation

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes and changelogs
- Project README (for significant contributions)

## 📞 Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Create an issue for bug reports or feature requests
- 📧 **Email**: Contact maintainers for private matters

---

Thank you for contributing to Gemini Code Reviewer! Your efforts help make code reviews better for everyone. 🚀
