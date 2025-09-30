# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

**Note**: We recommend always using the latest version of the application for the best security and features.

## 🚨 Reporting a Vulnerability

We take the security of Gemini Code Reviewer seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** (Preferred)
   - Go to the [Security tab](https://github.com/GizzZmo/Code-ReViewer/security)
   - Click "Report a vulnerability"
   - Fill out the form with details

2. **Private Communication**
   - Create a private issue with security concerns
   - We will respond as quickly as possible

### What to Include

Please include the following information:

- Type of issue (e.g., XSS, API key exposure, etc.)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit/direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Varies based on severity

We will:
1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

## 🛡️ Security Best Practices

### For Users

1. **API Key Security**
   - Never commit API keys to repositories
   - Use environment variables for local development
   - Store production keys in GitHub Secrets
   - Rotate keys regularly

2. **Environment Configuration**
   ```bash
   # ❌ Never do this
   export GEMINI_API_KEY="AIzaSy..." # in shell startup
   
   # ✅ Do this instead
   # Add to .env.local (gitignored)
   GEMINI_API_KEY=AIzaSy...
   ```

3. **Deployment**
   - Only deploy from trusted branches
   - Review workflow logs for exposed secrets
   - Use GitHub's secret scanning
   - Enable branch protection rules

### For Contributors

1. **Code Review**
   - Review all PRs for security issues
   - Check for hardcoded credentials
   - Validate input sanitization
   - Review dependencies for vulnerabilities

2. **Dependencies**
   ```bash
   # Regular security audits
   npm audit
   
   # Fix vulnerabilities
   npm audit fix
   ```

3. **Testing**
   - Test with invalid/malicious inputs
   - Verify XSS protection
   - Check for injection vulnerabilities
   - Test error handling

## 🔐 Security Features

### Current Security Measures

1. **Input Sanitization**
   - DOMPurify for HTML sanitization
   - React's built-in XSS protection
   - Markdown rendering security

2. **API Key Handling**
   - Environment variable isolation
   - Build-time injection
   - No hardcoded credentials

3. **Dependency Management**
   - Regular npm audits
   - Automated security updates
   - Minimal dependency tree

4. **CI/CD Security**
   - Automated security scanning
   - Secret detection in CI
   - Build artifact validation

### Recommended Security Headers

If self-hosting, add these headers to your web server:

```nginx
# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";

# Other security headers
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

## 🚫 Known Limitations

### API Key Exposure Risk

**Issue**: The application runs entirely in the browser, which means the API key must be included in the client-side build.

**Mitigation Strategies**:
1. Use API key restrictions in Google Cloud Console
2. Restrict API key to specific domains
3. Set usage quotas to limit potential abuse
4. Monitor API usage regularly

**For Production**: Consider using a backend proxy to keep API keys server-side.

### CORS and API Access

**Issue**: Direct API calls from browser may be subject to CORS restrictions.

**Current Status**: Gemini API supports CORS for browser-based applications.

## 📋 Security Checklist

### Before Deployment

- [ ] No hardcoded API keys in source code
- [ ] `.env.local` is in `.gitignore`
- [ ] GitHub secrets configured properly
- [ ] Dependencies are up to date
- [ ] `npm audit` shows no critical vulnerabilities
- [ ] Security headers configured (if self-hosting)
- [ ] API key restrictions set in Google Cloud Console
- [ ] Usage quotas configured
- [ ] Monitoring enabled

### Regular Maintenance

- [ ] Weekly: Check for dependency updates
- [ ] Monthly: Rotate API keys
- [ ] Monthly: Review access logs
- [ ] Quarterly: Security audit
- [ ] Yearly: Penetration testing (if applicable)

## 🔍 Vulnerability Disclosure Policy

We follow a **responsible disclosure** policy:

1. **Private Disclosure**: Report vulnerabilities privately first
2. **Acknowledgment**: We acknowledge receipt within 48 hours
3. **Investigation**: We investigate and develop fixes
4. **Coordination**: We coordinate public disclosure with reporter
5. **Public Disclosure**: After fix is deployed (typically 90 days)
6. **Credit**: We credit reporters (unless they prefer anonymity)

### Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

- *No reports yet*

## 📚 Security Resources

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [React Security Best Practices](https://react.dev/learn/security)
- [Gemini API Security](https://ai.google.dev/docs/security)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)

## 📞 Contact

For security-related questions:
- 🔒 Security Advisories: Use GitHub Security tab
- 💬 General Security Questions: GitHub Discussions
- 🐛 Public Issues: GitHub Issues (for non-sensitive topics)

## 🙏 Acknowledgments

We appreciate the security community's efforts in making this project more secure. Thank you to all researchers who responsibly disclose vulnerabilities.

---

**Last Updated**: December 2024
**Version**: 1.0.0
