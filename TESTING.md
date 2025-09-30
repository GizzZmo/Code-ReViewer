# Testing Guide

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Strategy](#testing-strategy)
- [Manual Testing](#manual-testing)
- [Automated Testing](#automated-testing)
- [Build Testing](#build-testing)
- [CI/CD Testing](#cicd-testing)
- [Testing Checklist](#testing-checklist)

## 🎯 Overview

This guide covers testing practices for the Gemini Code Reviewer project. Currently, the project uses a combination of manual testing, type checking, and build verification.

## 🧪 Testing Strategy

### Current Testing Approach

1. **Type Safety** - TypeScript compilation ensures type correctness
2. **Build Verification** - Production builds validate bundle integrity
3. **Manual Testing** - UI and functionality testing
4. **CI Validation** - Automated checks in GitHub Actions

### Future Testing Plans

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression testing

## ✋ Manual Testing

### Prerequisites

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local
```

### Test Scenarios

#### 1. Code Review Functionality

**Test Case**: Basic code review
```javascript
// Test input
function add(a, b) {
  return a + b;
}
```

**Steps**:
1. Paste code in editor
2. Click "Review Code"
3. Verify loading indicator appears
4. Verify review is displayed with markdown formatting
5. Check for all review sections (Bugs, Performance, etc.)

**Expected Result**: Detailed review with markdown formatting

---

**Test Case**: Empty input
```
(leave editor empty)
```

**Steps**:
1. Leave editor empty
2. Click "Review Code"
3. Verify error message

**Expected Result**: "Please enter some code to review."

---

**Test Case**: Long code snippet
```javascript
// Paste a file with 500+ lines of code
```

**Steps**:
1. Paste large code snippet
2. Click "Review Code"
3. Wait for response
4. Verify complete review

**Expected Result**: Complete review without timeout

---

**Test Case**: Invalid API key
```bash
# Set invalid API key in .env.local
GEMINI_API_KEY=invalid_key
```

**Steps**:
1. Paste code
2. Click "Review Code"
3. Verify error handling

**Expected Result**: "Failed to get review from Gemini API..."

#### 2. UI/UX Testing

**Test Case**: Responsive design
**Steps**:
1. Open in desktop browser (1920x1080)
2. Open in tablet view (768x1024)
3. Open in mobile view (375x667)
4. Verify layout adapts correctly

**Expected Result**: UI is usable on all screen sizes

---

**Test Case**: Loading states
**Steps**:
1. Submit code for review
2. Verify loading spinner appears
3. Verify button is disabled during loading
4. Verify button text changes to "Reviewing..."

**Expected Result**: Clear loading feedback

---

**Test Case**: Error states
**Steps**:
1. Trigger various errors (empty input, API error)
2. Verify error messages are clear
3. Verify errors are dismissible

**Expected Result**: User-friendly error messages

#### 3. Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Test Case**: Cross-browser functionality
**Steps**:
1. Open application in each browser
2. Submit code review
3. Verify markdown rendering
4. Check console for errors

**Expected Result**: Works consistently across browsers

#### 4. Markdown Rendering

**Test Case**: Markdown features
```javascript
// This should trigger markdown with:
// - Code blocks
// - Lists
// - Headers
// - Bold/italic text
function test() {
  var x = 1; // old syntax
  return x;
}
```

**Steps**:
1. Submit code
2. Verify markdown is rendered correctly
3. Check code blocks have syntax highlighting
4. Verify lists are formatted properly

**Expected Result**: Rich markdown formatting

## 🤖 Automated Testing

### Type Checking

```bash
# Run TypeScript type checking
npx tsc --noEmit
```

**What it checks**:
- Type correctness
- Missing types
- Type mismatches
- Import/export issues

**Expected Output**: No errors

### Linting (when configured)

```bash
# If eslint is configured
npm run lint
```

**What it checks**:
- Code style
- Best practices
- Potential bugs
- Unused variables

## 🏗️ Build Testing

### Development Build

```bash
# Start development server
npm run dev

# Test in browser
# Navigate to http://localhost:5173
```

**What to verify**:
- ✅ App loads without errors
- ✅ Hot reload works
- ✅ Console has no errors
- ✅ Environment variables load correctly

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**What to verify**:
- ✅ Build completes successfully
- ✅ No TypeScript errors
- ✅ Bundle size is reasonable (<10MB)
- ✅ Assets are optimized
- ✅ App works in preview mode

### Build Verification Script

```bash
#!/bin/bash
# save as scripts/test-build.sh

echo "Starting build verification..."

# 1. Type check
echo "Running type check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ Type check failed"
  exit 1
fi

# 2. Build
echo "Running build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# 3. Verify artifacts
echo "Verifying build artifacts..."
if [ ! -f "dist/index.html" ]; then
  echo "❌ index.html not found"
  exit 1
fi

# 4. Check build size
BUILD_SIZE=$(du -sm dist/ | cut -f1)
echo "Build size: ${BUILD_SIZE}MB"
if [ $BUILD_SIZE -gt 10 ]; then
  echo "⚠️  Build size is larger than 10MB"
fi

echo "✅ Build verification complete"
```

## 🔄 CI/CD Testing

### GitHub Actions Workflows

The CI/CD pipeline automatically runs:

1. **Type Checking**
   ```yaml
   - name: Type check
     run: npx tsc --noEmit
   ```

2. **Build Verification**
   ```yaml
   - name: Build application
     run: npm run build
   ```

3. **Security Audit**
   ```yaml
   - name: Run security audit
     run: npm audit --audit-level moderate
   ```

4. **Build Size Check**
   ```yaml
   - name: Check build size
     run: |
       BUILD_SIZE=$(du -sb dist/ | cut -f1)
       BUILD_SIZE_MB=$((BUILD_SIZE / 1024 / 1024))
       if [ $BUILD_SIZE_MB -gt 10 ]; then
         echo "::warning::Build size is larger than 10MB"
       fi
   ```

### Testing Pull Requests

When you open a PR, the CI automatically:
- Runs on multiple Node versions (18.x, 20.x)
- Performs security scans
- Checks code quality
- Validates documentation
- Builds the application

**Check CI results**:
1. Go to PR page
2. Scroll to "Checks" section
3. Review all workflow runs
4. Fix any failures

## ✅ Testing Checklist

### Before Committing

- [ ] Code compiles (`npx tsc --noEmit`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in development
- [ ] Tested main user flows manually
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables documented

### Before Opening PR

- [ ] All commits are meaningful
- [ ] Branch is up to date with main
- [ ] CI checks pass locally
- [ ] Documentation is updated
- [ ] Changes are tested in multiple browsers
- [ ] Screenshots added for UI changes

### Before Merging

- [ ] CI/CD pipeline passes
- [ ] Code reviewed by maintainer
- [ ] All comments addressed
- [ ] No merge conflicts
- [ ] Ready for deployment

## 🐛 Debugging Tests

### Common Issues

#### Build Failures

**Issue**: TypeScript compilation errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix type errors in reported files
```

**Issue**: Missing dependencies
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Environment variables not loading
```bash
# Verify .env.local exists
ls -la .env.local

# Check vite.config.ts configuration
cat vite.config.ts
```

#### Runtime Errors

**Issue**: API key not found
```bash
# Check environment variable
echo $GEMINI_API_KEY

# Verify it's in .env.local
grep GEMINI_API_KEY .env.local
```

**Issue**: CORS errors
```
# Gemini API should support CORS
# Check browser console for details
# Verify API key has correct permissions
```

#### UI Issues

**Issue**: Styles not loading
```bash
# Check Tailwind CDN is accessible
# Verify internet connection
# Check browser console for errors
```

**Issue**: Markdown not rendering
```bash
# Verify marked.js and DOMPurify are loaded
# Check browser console
# Inspect window.marked and window.DOMPurify
```

## 📊 Testing Metrics

### What to Measure

- **Build Time**: Should be < 5 seconds
- **Bundle Size**: Should be < 10MB
- **Load Time**: Should be < 3 seconds
- **API Response**: Should be < 10 seconds
- **Type Check**: Should be < 10 seconds

### How to Measure

```bash
# Build time
time npm run build

# Bundle size
du -sh dist/

# Type check time
time npx tsc --noEmit
```

## 🔮 Future Testing Enhancements

### Unit Testing with Vitest

```typescript
// Example unit test
import { describe, it, expect } from 'vitest';
import { reviewCode } from './services/geminiService';

describe('reviewCode', () => {
  it('should return a review string', async () => {
    const code = 'function test() {}';
    const review = await reviewCode(code);
    expect(review).toBeTruthy();
    expect(typeof review).toBe('string');
  });
});
```

### Component Testing

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { CodeEditor } from './components/CodeEditor';

test('renders code editor', () => {
  render(<CodeEditor code="" setCode={() => {}} />);
  const textarea = screen.getByRole('textbox');
  expect(textarea).toBeInTheDocument();
});
```

### E2E Testing with Playwright

```typescript
// Example E2E test
import { test, expect } from '@playwright/test';

test('code review flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('textarea', 'function test() {}');
  await page.click('button:has-text("Review Code")');
  await expect(page.locator('.review-output')).toBeVisible();
});
```

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Testing](https://www.typescriptlang.org/docs/handbook/testing.html)

---

**Last Updated**: December 2024
**Version**: 1.0.0
