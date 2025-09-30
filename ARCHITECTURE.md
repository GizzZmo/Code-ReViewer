# Architecture Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Technology Stack](#technology-stack)
- [File Structure](#file-structure)
- [Key Design Decisions](#key-design-decisions)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Build and Deployment](#build-and-deployment)

## 🎯 Overview

Gemini Code Reviewer is a single-page application (SPA) built with React and TypeScript. It provides a simple, intuitive interface for users to submit code and receive AI-powered reviews from Google's Gemini API.

### Core Principles

- **Simplicity**: Minimal dependencies, straightforward architecture
- **Type Safety**: Full TypeScript coverage for reliability
- **Performance**: Fast builds with Vite, optimized bundle size
- **Modularity**: Well-separated concerns and reusable components
- **Security**: Secure API key handling and no sensitive data storage

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Application (SPA)                    │ │
│  │                                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │   Code       │◄─┤     App      ├─►│   Review     │ │ │
│  │  │   Editor     │  │  Component   │  │   Output     │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  └──────────────┘  └───────┬──────┘  └──────────────┘ │ │
│  │                             │                           │ │
│  │                    ┌────────▼────────┐                 │ │
│  │                    │  Gemini Service │                 │ │
│  │                    │   (API Client)  │                 │ │
│  │                    └────────┬────────┘                 │ │
│  └─────────────────────────────┼──────────────────────────┘ │
└────────────────────────────────┼─────────────────────────────┘
                                 │
                                 │ HTTPS
                                 ▼
                    ┌────────────────────────┐
                    │   Google Gemini API    │
                    │   (generativelanguage) │
                    └────────────────────────┘
```

### Architecture Layers

1. **Presentation Layer** (React Components)
   - User interface components
   - Event handling and user interactions
   - Visual rendering and styling

2. **Business Logic Layer** (App Component)
   - Application state management
   - User flow orchestration
   - Error handling

3. **Service Layer** (Gemini Service)
   - API communication
   - Request/response transformation
   - Error handling and retry logic

4. **External Services**
   - Google Gemini API

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Header
│   └── RobotIcon
├── CodeEditor
└── ReviewOutput
    ├── Loader
    └── RobotIcon
```

### Component Responsibilities

#### `App.tsx` - Root Component
**Purpose**: Application orchestrator and state manager

**State**:
- `code`: User's input code
- `review`: AI-generated review
- `isLoading`: Loading state indicator
- `error`: Error message storage

**Responsibilities**:
- Manage application state
- Coordinate component interactions
- Handle review submission
- Error handling

```typescript
const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleReviewCode = async () => {
    // Review logic
  };

  return (
    // Layout
  );
};
```

#### `Header.tsx` - Navigation Header
**Purpose**: Display application title and branding

**Props**: None

**Features**:
- Responsive design
- Brand identity
- Navigation placeholder

#### `CodeEditor.tsx` - Code Input Component
**Purpose**: Provide interface for code input

**Props**:
- `code: string` - Current code value
- `setCode: (code: string) => void` - Update handler

**Features**:
- Textarea for code input
- Line numbers display
- Syntax highlighting (via CSS)
- Auto-resize

#### `ReviewOutput.tsx` - Review Display Component
**Purpose**: Display AI-generated review

**Props**:
- `review: string` - Markdown-formatted review
- `isLoading: boolean` - Loading state
- `error: string` - Error message

**Features**:
- Markdown rendering (via marked.js)
- HTML sanitization (via DOMPurify)
- Loading state UI
- Error state UI
- Empty state UI

#### `Loader.tsx` - Loading Indicator
**Purpose**: Visual feedback during API calls

**Props**: None

**Features**:
- Animated spinner
- Accessible loading state

#### `RobotIcon.tsx` - Brand Icon
**Purpose**: Display robot/AI icon

**Props**:
- `className?: string` - CSS classes

**Features**:
- SVG-based icon
- Scalable and customizable

## 🔄 Data Flow

### Review Submission Flow

```
┌──────────┐
│  User    │
│  Action  │
└────┬─────┘
     │
     │ 1. User pastes code
     ▼
┌──────────────┐
│ CodeEditor   │
│ setCode()    │
└────┬─────────┘
     │
     │ 2. State updated
     ▼
┌──────────────┐
│  App State   │
│  code: "..." │
└────┬─────────┘
     │
     │ 3. User clicks "Review Code"
     ▼
┌───────────────────┐
│ handleReviewCode()│
│ setIsLoading(true)│
└────┬──────────────┘
     │
     │ 4. Call service
     ▼
┌──────────────────┐
│ geminiService    │
│ reviewCode()     │
└────┬─────────────┘
     │
     │ 5. API request
     ▼
┌──────────────────┐
│  Gemini API      │
│  POST request    │
└────┬─────────────┘
     │
     │ 6. API response
     ▼
┌───────────────────┐
│ Response handling │
│ setReview()       │
│ setIsLoading(false)│
└────┬──────────────┘
     │
     │ 7. State updated
     ▼
┌──────────────────┐
│ ReviewOutput     │
│ Renders review   │
└──────────────────┘
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.1**: UI library
- **TypeScript 5.8.2**: Type safety and developer experience

### Build Tool
- **Vite 6.2.0**: Fast development and optimized production builds
  - Hot Module Replacement (HMR)
  - Fast cold start
  - Optimized bundle splitting

### API Integration
- **@google/genai 1.15.0**: Official Google Gemini SDK
  - Type-safe API client
  - Promise-based interface
  - Built-in error handling

### UI Rendering
- **marked.js**: Markdown to HTML conversion
- **DOMPurify**: HTML sanitization for security
- **Tailwind CSS**: Utility-first CSS framework (via CDN)

### Development Tools
- **@types/node**: Node.js type definitions
- **TypeScript**: Static type checking

## 📁 File Structure

```
Code-ReViewer/
├── .github/
│   └── workflows/           # CI/CD workflows
│       ├── ci.yml          # Continuous integration
│       ├── deploy.yml      # Deployment workflow
│       ├── release.yml     # Release automation
│       ├── env-setup.yml   # Environment validation
│       ├── ai-studio.yml   # AI Studio specific workflow
│       └── README.md       # Workflow documentation
│
├── components/             # React components
│   ├── CodeEditor.tsx     # Code input component
│   ├── ReviewOutput.tsx   # Review display component
│   ├── Header.tsx         # Application header
│   ├── Loader.tsx         # Loading indicator
│   └── icons/             # Icon components
│       └── RobotIcon.tsx  # Robot/AI icon
│
├── services/              # Business logic and services
│   └── geminiService.ts  # Gemini API integration
│
├── App.tsx               # Root application component
├── index.tsx             # Application entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
│
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
│
└── Documentation/
    ├── README.md            # Project overview
    ├── CONTRIBUTING.md      # Contribution guidelines
    ├── CODE_OF_CONDUCT.md   # Community guidelines
    ├── DEPLOYMENT.md        # Deployment guide
    └── ARCHITECTURE.md      # This file
```

## 🎯 Key Design Decisions

### 1. Single Page Application (SPA)

**Decision**: Build as a client-side SPA without backend
**Rationale**:
- Simplicity: No server infrastructure needed
- Performance: Fast, responsive UI
- Deployment: Easy static hosting
- Cost: Minimal hosting costs

**Trade-offs**:
- API key must be included in client (requires secure handling)
- No server-side caching
- All logic runs in browser

### 2. Direct API Integration

**Decision**: Call Gemini API directly from browser
**Rationale**:
- Simplicity: No backend proxy needed
- Real-time: Direct communication with AI
- Stateless: No session management

**Trade-offs**:
- API key exposure (mitigated via environment variables)
- CORS requirements
- Rate limiting handled client-side

### 3. State Management

**Decision**: Use React's built-in useState hooks
**Rationale**:
- Simple state needs
- No need for complex state management
- Fewer dependencies
- Easy to understand and maintain

**Trade-offs**:
- Limited to component tree
- No time-travel debugging
- Manual prop drilling if needed

### 4. Styling Approach

**Decision**: Use Tailwind CSS via CDN
**Rationale**:
- No build step for CSS
- Utility-first approach
- Rapid development
- Consistent design system

**Trade-offs**:
- Larger initial download
- No PurgeCSS optimization
- CDN dependency

### 5. Markdown Rendering

**Decision**: Use marked.js and DOMPurify
**Rationale**:
- Gemini returns markdown
- Security: Sanitize HTML output
- Flexibility: Support rich formatting

**Trade-offs**:
- Additional dependencies
- XSS protection overhead
- Bundle size increase

### 6. Build Tool Selection

**Decision**: Use Vite over Webpack/CRA
**Rationale**:
- Faster development experience
- Native ESM support
- Better performance
- Simpler configuration
- Modern tooling

**Trade-offs**:
- Less ecosystem maturity
- Some plugins may not exist

## 🔌 API Integration

### Gemini Service Architecture

```typescript
// services/geminiService.ts

import { GoogleGenAI } from "@google/genai";

// 1. Initialize client
const ai = new GoogleGenAI({ apiKey: API_KEY });

// 2. Define system prompt
const systemInstruction = `...`;

// 3. Export service function
export const reviewCode = async (code: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: code,
    config: { systemInstruction }
  });
  return response.text;
};
```

### API Request Flow

1. **Initialization**: GoogleGenAI client created with API key
2. **Request**: User code sent with system instruction
3. **Processing**: Gemini processes code and generates review
4. **Response**: Markdown-formatted review returned
5. **Rendering**: Markdown converted to HTML and displayed

### Error Handling

```typescript
try {
  const response = await ai.models.generateContent(...);
  return response.text;
} catch (error) {
  console.error("Error calling Gemini API:", error);
  throw new Error("Failed to get review...");
}
```

## 🔐 State Management

### App-Level State

```typescript
interface AppState {
  code: string;        // User's input code
  review: string;      // AI-generated review
  isLoading: boolean;  // API call in progress
  error: string;       // Error message
}
```

### State Transitions

```
Initial State:
  code: ""
  review: ""
  isLoading: false
  error: ""

User Types Code:
  code: "function hello() {...}"
  review: ""
  isLoading: false
  error: ""

Review Initiated:
  code: "function hello() {...}"
  review: ""
  isLoading: true  ← Changed
  error: ""

Review Complete:
  code: "function hello() {...}"
  review: "### Bugs\n..."  ← Changed
  isLoading: false  ← Changed
  error: ""

Review Error:
  code: "function hello() {...}"
  review: ""
  isLoading: false  ← Changed
  error: "API key invalid"  ← Changed
```

## 🚀 Build and Deployment

### Development Build

```bash
npm run dev
```

**Features**:
- Hot Module Replacement (HMR)
- Source maps for debugging
- Fast refresh
- Environment variable loading from `.env.local`

### Production Build

```bash
npm run build
```

**Process**:
1. TypeScript compilation
2. Module bundling and tree-shaking
3. Asset optimization
4. Code minification
5. Hash generation for cache busting

**Output**:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript
│   └── [other-assets]
```

### Deployment Targets

1. **GitHub Pages**
   - Static file hosting
   - Automatic deployment via GitHub Actions
   - Custom domain support

2. **Vercel/Netlify**
   - One-click deployment
   - Automatic HTTPS
   - CDN distribution

3. **Self-hosted**
   - Any static file server
   - Nginx, Apache, etc.

### Environment Configuration

**Development** (`.env.local`):
```env
GEMINI_API_KEY=dev_key_here
NODE_ENV=development
```

**Production** (GitHub Secrets):
- `GEMINI_API_KEY` injected during build
- Environment variables baked into build

## 🔒 Security Considerations

### API Key Handling

1. **Never commit**: API keys never in source code
2. **Environment variables**: Use `.env.local` for development
3. **Build-time injection**: Keys injected during build process
4. **GitHub Secrets**: Store production keys securely

### XSS Protection

1. **DOMPurify**: Sanitize all HTML from markdown
2. **React**: Automatic XSS protection for JSX
3. **CSP Headers**: Content Security Policy (optional)

### Dependencies

1. **Regular audits**: `npm audit` in CI
2. **Minimal dependencies**: Only essential packages
3. **Version pinning**: Lock file for reproducibility

## 📈 Performance Optimizations

### Current Optimizations

1. **Code Splitting**: Automatic chunk splitting by Vite
2. **Tree Shaking**: Remove unused code
3. **Minification**: UglifyJS for production
4. **Compression**: Gzip compression in production
5. **Caching**: Content-addressable asset names

### Bundle Analysis

```bash
npm run build
# Check dist/ folder size
# Review Vite build output
```

### Future Optimization Opportunities

1. **Lazy Loading**: Dynamic imports for large components
2. **Service Worker**: Offline support and caching
3. **Image Optimization**: If images are added
4. **Bundle Analysis**: Visualize bundle composition

## 🧪 Testing Strategy

### Current Testing

- **Type Checking**: TypeScript compilation
- **Build Verification**: Production build testing
- **Manual Testing**: UI and functionality testing

### Future Testing Enhancements

1. **Unit Tests**: Component testing with Jest/Vitest
2. **Integration Tests**: API integration testing
3. **E2E Tests**: Full user flow testing with Playwright
4. **Visual Regression**: Screenshot comparison

## 🔄 Continuous Integration

### CI Pipeline

```yaml
Trigger: Push or PR
  ↓
Checkout Code
  ↓
Setup Node.js (18.x, 20.x)
  ↓
Install Dependencies
  ↓
Type Check
  ↓
Build
  ↓
Security Audit
  ↓
Upload Artifacts
```

See [.github/workflows/README.md](.github/workflows/README.md) for details.

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Last Updated**: [Current Date]
**Version**: 1.0.0
