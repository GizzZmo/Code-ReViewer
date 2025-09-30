# API Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Gemini Service API](#gemini-service-api)
- [Component APIs](#component-apis)
- [Environment Configuration](#environment-configuration)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

## 🎯 Overview

This document describes the internal APIs and interfaces used in the Gemini Code Reviewer application. The application primarily consists of React components and a service layer for Gemini API integration.

## 🔌 Gemini Service API

### Location
`services/geminiService.ts`

### Exports

#### `reviewCode(code: string): Promise<string>`

Main function to review code using the Gemini API.

**Type Signature**:
```typescript
export const reviewCode = async (code: string): Promise<string>
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | The code snippet to review |

**Returns**:
- `Promise<string>`: A promise that resolves to a markdown-formatted review

**Throws**:
- `Error`: If the API key is missing
- `Error`: If the API call fails

**Example**:
```typescript
import { reviewCode } from './services/geminiService';

try {
  const code = 'function add(a, b) { return a + b; }';
  const review = await reviewCode(code);
  console.log(review);
  // Output: Markdown-formatted review
} catch (error) {
  console.error('Review failed:', error.message);
}
```

**Review Format**:
The returned review is a markdown string with the following sections:

```markdown
### 🐛 Bugs & Potential Issues
- Bug descriptions here

### ⚡ Performance
- Performance suggestions here

### 📖 Readability & Style
- Style improvements here

### 🎯 Best Practices & Suggestions
- Best practice recommendations here

### 🔒 Security
- Security concerns here
```

**Error Scenarios**:

1. **Missing API Key**:
```typescript
// Throws: "API_KEY environment variable not set"
```

2. **API Call Failure**:
```typescript
// Throws: "Failed to get review from Gemini API. Please check your API key and network connection."
```

### Internal Configuration

#### `systemInstruction`

The prompt sent to Gemini to guide the review process.

**Type**: `string`

**Content**:
```typescript
const systemInstruction = `
You are an expert code reviewer AI. Your purpose is to provide a comprehensive, clear, and constructive code review.
When you receive a code snippet, analyze it thoroughly and provide feedback in well-structured Markdown format.

Your review should cover the following aspects:
1. **Bugs & Potential Issues**: Identify any bugs, logical errors, or edge cases that might not be handled correctly.
2. **Performance**: Point out any performance bottlenecks or suggest more efficient alternatives.
3. **Readability & Style**: Comment on code style, naming conventions, and overall readability. Suggest improvements for clarity.
4. **Best Practices & Suggestions**: Recommend modern language features, design patterns, or other best practices that could be applied.
5. **Security**: Highlight any potential security vulnerabilities.

Structure your output using Markdown headings for each section (e.g., "### 🐛 Bugs & Potential Issues").
Use code blocks (\`\`\`) for code examples. Be polite and educational in your tone.
If the code is perfect, commend the user and explain why it's well-written.
`;
```

**Customization**:
To customize the review criteria, modify this constant in `services/geminiService.ts`.

#### Gemini Client Configuration

```typescript
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Model configuration
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",  // Model version
  contents: code,              // User's code
  config: {
    systemInstruction: systemInstruction
  }
});
```

## 🧩 Component APIs

### App Component

**File**: `App.tsx`

**Type**: `React.FC`

**State Interface**:
```typescript
interface AppState {
  code: string;        // User's input code
  review: string;      // AI-generated review
  isLoading: boolean;  // Loading state
  error: string;       // Error message
}
```

**Methods**:

#### `handleReviewCode(): Promise<void>`

Handles the code review submission.

```typescript
const handleReviewCode = useCallback(async () => {
  if (!code.trim()) {
    setError('Please enter some code to review.');
    return;
  }
  setIsLoading(true);
  setError('');
  setReview('');
  try {
    const feedback = await reviewCode(code);
    setReview(feedback);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    setReview('');
  } finally {
    setIsLoading(false);
  }
}, [code]);
```

### Header Component

**File**: `components/Header.tsx`

**Type**: `React.FC`

**Props**: None

**Usage**:
```tsx
import { Header } from './components/Header';

<Header />
```

### CodeEditor Component

**File**: `components/CodeEditor.tsx`

**Type**: `React.FC<CodeEditorProps>`

**Props Interface**:
```typescript
interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | Current code value |
| `setCode` | `(code: string) => void` | Yes | Callback to update code |

**Usage**:
```tsx
import { CodeEditor } from './components/CodeEditor';

const [code, setCode] = useState('');

<CodeEditor code={code} setCode={setCode} />
```

### ReviewOutput Component

**File**: `components/ReviewOutput.tsx`

**Type**: `React.FC<ReviewOutputProps>`

**Props Interface**:
```typescript
interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string;
}
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `review` | `string` | Yes | Markdown-formatted review text |
| `isLoading` | `boolean` | Yes | Whether review is being generated |
| `error` | `string` | Yes | Error message to display |

**Usage**:
```tsx
import { ReviewOutput } from './components/ReviewOutput';

<ReviewOutput 
  review={review} 
  isLoading={isLoading} 
  error={error} 
/>
```

**Internal Methods**:

#### `renderMarkdown(markdown: string): string`

Converts markdown to sanitized HTML.

```typescript
const renderMarkdown = (markdown: string): string => {
  if (window.marked && window.DOMPurify) {
    const rawHtml = window.marked.parse(markdown);
    return window.DOMPurify.sanitize(rawHtml);
  }
  return markdown;
};
```

### Loader Component

**File**: `components/Loader.tsx`

**Type**: `React.FC`

**Props**: None

**Usage**:
```tsx
import { Loader } from './components/Loader';

<Loader />
```

### RobotIcon Component

**File**: `components/icons/RobotIcon.tsx`

**Type**: `React.FC<RobotIconProps>`

**Props Interface**:
```typescript
interface RobotIconProps {
  className?: string;
}
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | CSS classes for styling |

**Usage**:
```tsx
import { RobotIcon } from './components/icons/RobotIcon';

<RobotIcon className="w-6 h-6 text-blue-500" />
```

## ⚙️ Environment Configuration

### Required Environment Variables

#### `GEMINI_API_KEY`

**Type**: `string`

**Required**: Yes

**Description**: Your Google Gemini API key

**How to Obtain**:
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key

**Configuration**:

**Development** (`.env.local`):
```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

**Production** (GitHub Secrets):
```
Settings → Secrets and variables → Actions → New repository secret
Name: GEMINI_API_KEY
Value: AIzaSy...your_key_here
```

**Access in Code**:
```typescript
const API_KEY = process.env.API_KEY;
```

**Note**: Vite configuration maps `GEMINI_API_KEY` to `process.env.API_KEY`.

### Optional Environment Variables

#### `NODE_ENV`

**Type**: `string`

**Required**: No

**Default**: `development`

**Values**: `development` | `production`

**Description**: Environment mode

## 🚨 Error Handling

### Error Types

#### 1. Missing API Key

**Trigger**: API key not configured

**Error Message**: `"API_KEY environment variable not set"`

**Resolution**:
```bash
# Add to .env.local
GEMINI_API_KEY=your_key_here
```

#### 2. API Call Failure

**Trigger**: Network error, invalid API key, rate limit

**Error Message**: `"Failed to get review from Gemini API. Please check your API key and network connection."`

**Resolution**:
- Verify API key is correct
- Check internet connection
- Verify Gemini API is accessible
- Check for rate limits

#### 3. Empty Code Input

**Trigger**: User clicks review without entering code

**Error Message**: `"Please enter some code to review."`

**Resolution**: Enter code in the editor

### Error Handling Pattern

```typescript
try {
  // API call
  const result = await reviewCode(code);
  setReview(result);
  setError('');
} catch (err) {
  setError(err instanceof Error ? err.message : 'An unknown error occurred.');
  setReview('');
} finally {
  setIsLoading(false);
}
```

## 📖 Usage Examples

### Example 1: Basic Code Review

```typescript
import { reviewCode } from './services/geminiService';

const code = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
`;

const review = await reviewCode(code);
console.log(review);
```

**Expected Output**:
```markdown
### 🐛 Bugs & Potential Issues
No major bugs detected. The function handles the basic case correctly.

### ⚡ Performance
- Consider using `reduce()` for a more functional approach
- Modern array methods can be more performant and readable

### 📖 Readability & Style
- Good naming conventions
- Consider adding JSDoc comments
- Add input validation

### 🎯 Best Practices & Suggestions
Modern ES6+ alternative:
\`\`\`javascript
const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0);
\`\`\`

### 🔒 Security
- Add input validation to ensure `items` is an array
- Validate that `price` exists and is a number
```

### Example 2: With Error Handling

```typescript
import { reviewCode } from './services/geminiService';

async function handleCodeReview(code: string) {
  try {
    if (!code.trim()) {
      throw new Error('Code cannot be empty');
    }
    
    const review = await reviewCode(code);
    return { success: true, review };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Usage
const result = await handleCodeReview(userCode);
if (result.success) {
  console.log('Review:', result.review);
} else {
  console.error('Error:', result.error);
}
```

### Example 3: Component Integration

```tsx
import React, { useState } from 'react';
import { reviewCode } from './services/geminiService';

function MyCodeReviewer() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await reviewCode(code);
      setReview(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleReview} disabled={loading}>
        {loading ? 'Reviewing...' : 'Review Code'}
      </button>
      {review && <div dangerouslySetInnerHTML={{ __html: review }} />}
    </div>
  );
}
```

## ✅ Best Practices

### 1. API Key Security

```typescript
// ❌ Don't hardcode API keys
const API_KEY = "AIzaSy...";

// ✅ Use environment variables
const API_KEY = process.env.API_KEY;
```

### 2. Error Handling

```typescript
// ❌ Don't ignore errors
await reviewCode(code);

// ✅ Always handle errors
try {
  await reviewCode(code);
} catch (error) {
  // Handle error
}
```

### 3. Input Validation

```typescript
// ❌ Don't skip validation
await reviewCode(code);

// ✅ Validate input
if (!code.trim()) {
  throw new Error('Code cannot be empty');
}
await reviewCode(code);
```

### 4. Loading States

```typescript
// ❌ Don't leave users in the dark
await reviewCode(code);

// ✅ Show loading states
setIsLoading(true);
try {
  await reviewCode(code);
} finally {
  setIsLoading(false);
}
```

### 5. Sanitize HTML

```typescript
// ❌ Don't render raw HTML
<div dangerouslySetInnerHTML={{ __html: markdown }} />

// ✅ Sanitize with DOMPurify
const sanitized = DOMPurify.sanitize(marked.parse(markdown));
<div dangerouslySetInnerHTML={{ __html: sanitized }} />
```

## 🔗 Related Documentation

- [Architecture Documentation](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Gemini API Documentation](https://ai.google.dev/docs)

---

**Last Updated**: [Current Date]
**Version**: 1.0.0
