# 🚀 Deployment Guide

This guide covers various deployment options for the Flower Delivery App, from development to production environments.

## 📋 Prerequisites

Before deploying, ensure you have:

- Node.js (v16.0 or higher)
- npm or yarn package manager
- Git for version control
- A built version of the application (`npm run build`)

## 🏗️ Build Process

### Development Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build process creates a `dist` folder with optimized static files ready for deployment.

## 🌐 Deployment Options

### 1. Netlify Deployment

#### Option A: Drag and Drop
1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist` folder to the deployment area

#### Option B: Git Integration
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

#### Option C: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Netlify Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 2. Vercel Deployment

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

#### Option B: Git Integration
1. Push code to GitHub/GitLab
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Configure build settings (auto-detected for Vite)

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. GitHub Pages

#### Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://yourusername.github.io/flower-delivery-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

#### Vite Configuration for GitHub Pages

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/flower-delivery-app/', // Replace with your repo name
  build: {
    outDir: 'dist',
  },
})
```

### 4. Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting
```

#### Firebase Configuration

Select these options during initialization:
- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **Automatic builds**: `No` (unless using GitHub integration)

#### Deploy
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### 5. AWS S3 + CloudFront

#### S3 Setup
1. Create an S3 bucket
2. Enable static website hosting
3. Upload `dist` folder contents
4. Configure bucket policy for public access

#### CloudFront Setup
1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Configure custom error pages for SPA routing

#### AWS CLI Deployment
```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Sync build to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 6. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration
Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Docker Commands
```bash
# Build Docker image
docker build -t flower-delivery-app .

# Run container
docker run -p 80:80 flower-delivery-app

# Docker Compose
docker-compose up -d
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## 🔧 Environment Configuration

### Environment Variables

Create `.env.production`:

```env
VITE_APP_TITLE=Flower Delivery App
VITE_API_URL=https://api.yourflowerapp.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Build-time Variables

In `vite.config.ts`:

```typescript
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
```

## 🔍 Deployment Verification

### Health Check Script

Create `scripts/health-check.js`:

```javascript
const https = require('https');

const healthCheck = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Deployment successful!');
        resolve(true);
      } else {
        console.log('❌ Deployment failed!');
        reject(false);
      }
    }).on('error', reject);
  });
};

healthCheck('https://your-app-url.com')
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
```

### Automated Testing

```bash
# Add to package.json scripts
{
  "scripts": {
    "test:e2e": "cypress run",
    "test:lighthouse": "lighthouse https://your-app-url.com --output=json",
    "verify:deployment": "node scripts/health-check.js"
  }
}
```

## 📊 Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### Asset Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli

# Compress images
imagemin src/assets/*.{jpg,png} --out-dir=dist/assets --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant
```

## 🔒 Security Configuration

### Content Security Policy

Add to your HTML or server configuration:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.pexels.com;
  font-src 'self';
  connect-src 'self' https://api.yourflowerapp.com;
">
```

### HTTPS Configuration

Ensure all deployments use HTTPS:

```nginx
# Nginx redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run test
    - npm run lint

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  only:
    - main
```

## 📈 Monitoring and Analytics

### Error Tracking

```typescript
// Add to main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring

```typescript
// Add Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔧 Troubleshooting

### Common Issues

**Issue**: 404 errors on page refresh
**Solution**: Configure server redirects for SPA routing

**Issue**: Assets not loading
**Solution**: Check base URL configuration in `vite.config.ts`

**Issue**: Environment variables not working
**Solution**: Ensure variables are prefixed with `VITE_`

**Issue**: Build size too large
**Solution**: Implement code splitting and tree shaking

### Debug Commands

```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck

# Audit security vulnerabilities
npm audit

# Check TypeScript errors
npx tsc --noEmit
```

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

Choose the deployment option that best fits your needs, budget, and technical requirements. Each option has its own advantages in terms of cost, performance, and ease of use.