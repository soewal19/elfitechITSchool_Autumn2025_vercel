# E2E Testing Suite Documentation

## Overview

This comprehensive End-to-End (E2E) testing suite is built using Cypress to ensure the reliability and quality of the Flower Shop E-commerce application. The test suite covers all critical user journeys, performance metrics, and responsive design validation.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- The flower shop application running locally

### Installation

```bash
# Install dependencies (if not already installed)
npm install

# Install Cypress (included in package.json)
npm install cypress --save-dev
```

### Running Tests

#### Interactive Mode (Recommended for Development)
```bash
# Open Cypress Test Runner
npx cypress open

# Or using npm script
npm run cypress:open
```

#### Headless Mode (CI/CD)
```bash
# Run all E2E tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/flower-shop.cy.ts"

# Run with specific browser
npx cypress run --browser chrome

# Run with video recording disabled
npx cypress run --video false
```

#### Component Testing
```bash
# Open component test runner
npx cypress open --component

# Run component tests headlessly
npx cypress run --component
```

## 📁 Test Structure

```
cypress/
├── e2e/                          # End-to-end tests
│   ├── flower-shop.cy.ts         # Main application functionality
│   ├── mobile-responsive.cy.ts   # Mobile responsiveness tests
│   └── performance.cy.ts         # Performance and load tests
├── component/                    # Component tests
│   ├── FlowerCard.cy.tsx         # FlowerCard component tests
│   └── Pagination.cy.tsx         # Pagination component tests
├── support/                      # Support files and custom commands
│   ├── commands.ts               # Custom Cypress commands
│   ├── e2e.ts                   # E2E support file
│   └── component.ts             # Component support file
├── fixtures/                     # Test data (auto-generated)
└── screenshots/                  # Test screenshots (auto-generated)
```

## 🧪 Test Categories

### 1. Core Functionality Tests (`flower-shop.cy.ts`)

#### Homepage and Navigation
- ✅ Homepage loading and basic elements
- ✅ Navigation between pages
- ✅ Responsive navigation menu
- ✅ URL routing validation

#### Product Browsing and Filtering
- ✅ Product display with correct information
- ✅ Shop filtering functionality
- ✅ Product sorting (price, name, date, favorites)
- ✅ Pagination controls and navigation
- ✅ Items per page selection

#### Shopping Cart Functionality
- ✅ Adding items to cart
- ✅ Updating cart quantities
- ✅ Removing items from cart
- ✅ Cart counter updates
- ✅ Cart persistence

#### Checkout Process
- ✅ Customer information form validation
- ✅ Complete checkout flow
- ✅ Coupon code application
- ✅ Order confirmation
- ✅ Order success page

#### Favorites System
- ✅ Adding/removing favorites
- ✅ Favorites counter updates
- ✅ Favorites page functionality
- ✅ Favorites persistence

#### Analytics Dashboard
- ✅ Dashboard display and loading
- ✅ Chart rendering and interactions
- ✅ Time range filtering
- ✅ Data visualization accuracy

#### Google Maps Integration
- ✅ Interactive map display
- ✅ Location selection functionality
- ✅ Current location detection
- ✅ Address auto-fill integration
- ✅ Shop markers and route display

#### Order History
- ✅ Order search by email/phone/ID
- ✅ Order details display
- ✅ Historical data accuracy

### 2. Mobile Responsive Tests (`mobile-responsive.cy.ts`)

#### Device Testing
- 📱 iPhone SE (375x667)
- 📱 iPhone XR (414x896)
- 📱 iPad (768x1024)
- 📱 iPad Landscape (1024x768)

#### Responsive Features
- ✅ Mobile navigation menu
- ✅ Touch interactions
- ✅ Grid layout adaptations
- ✅ Form usability on mobile
- ✅ Map interaction on touch devices
- ✅ Typography and button sizing
- ✅ Cross-device consistency

### 3. Performance Tests (`performance.cy.ts`)

#### Load Time Metrics
- ⚡ Homepage load time (< 3 seconds)
- ⚡ Core Web Vitals measurement
- ⚡ First Contentful Paint (FCP)
- ⚡ Largest Contentful Paint (LCP)

#### Interaction Performance
- ⚡ Chart rendering efficiency
- ⚡ Pagination performance
- ⚡ Search and filtering speed
- ⚡ Cart operations timing
- ⚡ Map rendering performance
- ⚡ Image loading optimization

#### Resource Usage
- ⚡ Memory usage monitoring
- ⚡ Network request optimization
- ⚡ Bundle size validation

### 4. Component Tests

#### FlowerCard Component
- ✅ Proper rendering of flower information
- ✅ Add to cart functionality
- ✅ Favorite toggle behavior
- ✅ Hover effects and interactions
- ✅ Accessibility compliance
- ✅ Error handling (broken images, long names)

#### Pagination Component
- ✅ Page navigation controls
- ✅ Go to page functionality
- ✅ Items per page selection
- ✅ Input validation
- ✅ Keyboard accessibility
- ✅ Edge case handling

## 🛠️ Custom Commands

### Navigation Commands
```typescript
cy.waitForPageLoad()              // Wait for page to fully load
cy.checkResponsive()              // Test multiple viewport sizes
```

### Shopping Commands
```typescript
cy.addToCart('Rose Bouquet', 2)   // Add specific item to cart
cy.fillCustomerForm({             // Fill checkout form
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  address: '123 Main St'
})
```

### Utility Commands
```typescript
cy.takeScreenshot('test-name')    // Take timestamped screenshot
cy.waitForAnimation(1000)         // Wait for animations to complete
```

## 📊 Test Data and Fixtures

### Dynamic Test Data
Tests use the application's existing mock data and generate additional test scenarios dynamically:

- **Flower Data**: Uses actual flower catalog from `src/data/mockData.ts`
- **Shop Information**: Tests against real shop categories and filters
- **Coupon Codes**: Validates actual coupon functionality
- **Analytics Data**: Generates realistic analytics scenarios

### Test User Data
```typescript
const testCustomer = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+1234567890',
  address: '123 Test Street, Test City, TC 12345'
}
```

## 🎯 Test Scenarios

### Critical User Journeys

1. **New User Shopping Flow**
   - Browse products → Filter by shop → Add to favorites → Add to cart → Checkout

2. **Returning Customer Flow**
   - View order history → Search previous orders → Reorder items

3. **Mobile User Experience**
   - Touch navigation → Mobile cart → Touch-friendly checkout

4. **Analytics User Flow**
   - View dashboard → Filter time ranges → Interact with charts

### Edge Cases and Error Handling

1. **Network Issues**
   - Slow loading conditions
   - Image loading failures
   - Form submission errors

2. **Input Validation**
   - Invalid email formats
   - Empty required fields
   - Invalid coupon codes
   - Out-of-range pagination

3. **Browser Compatibility**
   - Different viewport sizes
   - Touch vs. mouse interactions
   - Local storage availability

## 📈 Performance Budgets

### Load Time Budgets
- **Homepage**: < 3 seconds
- **Chart Rendering**: < 2 seconds
- **Pagination**: < 1 second
- **Filtering**: < 1.5 seconds
- **Cart Operations**: < 2 seconds
- **Map Rendering**: < 2 seconds

### Core Web Vitals Targets
- **First Contentful Paint (FCP)**: < 2.5 seconds
- **Largest Contentful Paint (LCP)**: < 4 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Memory Usage
- **Memory Increase**: < 50MB during navigation
- **Memory Leaks**: No significant leaks detected

## 🔧 Configuration

### Cypress Configuration (`cypress.config.ts`)
```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  }
})
```

### Environment Variables
```bash
CYPRESS_baseUrl=http://localhost:5173
CYPRESS_viewportWidth=1280
CYPRESS_viewportHeight=720
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Tests Failing Due to Timing
**Problem**: Elements not found or interactions failing
**Solution**: 
```typescript
// Use proper waits
cy.get('[data-testid="element"]', { timeout: 10000 })
cy.wait('@apiCall')
cy.waitForPageLoad()
```

#### 2. Flaky Tests
**Problem**: Tests passing/failing inconsistently
**Solution**:
```typescript
// Add proper assertions and waits
cy.get('[data-testid="loading"]').should('not.exist')
cy.get('[data-testid="content"]').should('be.visible')
```

#### 3. Mobile Tests Failing
**Problem**: Touch interactions not working
**Solution**:
```typescript
// Use proper touch events
cy.get('element').trigger('touchstart')
cy.get('element').trigger('touchend')
```

#### 4. Performance Tests Inconsistent
**Problem**: Performance metrics varying
**Solution**:
- Run tests multiple times
- Use average measurements
- Account for system load

### Debug Mode
```bash
# Run with debug output
DEBUG=cypress:* npx cypress run

# Run with browser console
npx cypress open --browser chrome --headed
```

### Test Data Reset
```bash
# Clear test data and screenshots
npx cypress run --record false --video false
rm -rf cypress/screenshots cypress/videos
```

## 📋 Test Reports

### HTML Reports
Tests generate detailed HTML reports with:
- Test execution summary
- Screenshots of failures
- Performance metrics
- Video recordings

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Run Cypress Tests
  run: |
    npm run build
    npm start &
    npx wait-on http://localhost:5173
    npx cypress run --record --key ${{ secrets.CYPRESS_RECORD_KEY }}
```

### Metrics Tracking
- Test execution time
- Success/failure rates
- Performance regression detection
- Coverage reports

## 🔄 Continuous Integration

### Pre-commit Hooks
```bash
# Run quick smoke tests before commit
npm run test:smoke
```

### Pull Request Checks
- All E2E tests must pass
- Performance budgets must be met
- No accessibility violations
- Mobile responsiveness verified

### Nightly Builds
- Full test suite execution
- Performance regression testing
- Cross-browser compatibility
- Extended load testing

## 📚 Best Practices

### Writing Tests
1. **Use data-testid attributes** for reliable element selection
2. **Write descriptive test names** that explain the expected behavior
3. **Group related tests** using describe blocks
4. **Use proper assertions** that wait for conditions
5. **Clean up test data** between tests

### Maintaining Tests
1. **Keep tests independent** - each test should work in isolation
2. **Use page object patterns** for complex interactions
3. **Regular test review** and cleanup of obsolete tests
4. **Update tests** when features change
5. **Monitor test performance** and optimize slow tests

### Debugging Tests
1. **Use cy.debug()** to pause test execution
2. **Take screenshots** at key points
3. **Use browser dev tools** in headed mode
4. **Check network tab** for failed requests
5. **Verify element selectors** in browser console

## 🎉 Success Metrics

### Test Coverage Goals
- ✅ 95%+ critical user journey coverage
- ✅ 100% checkout flow coverage
- ✅ 90%+ component test coverage
- ✅ All responsive breakpoints tested

### Quality Gates
- ✅ Zero critical bugs in production
- ✅ < 1% test flakiness rate
- ✅ Performance budgets maintained
- ✅ Accessibility standards met

This comprehensive testing suite ensures the Flower Shop application delivers a reliable, performant, and delightful user experience across all devices and use cases.