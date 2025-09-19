# 🌸 Flower Delivery App

A modern, responsive web application for ordering flower delivery services. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful UI and comprehensive e-commerce functionality.

![Flower Delivery App](https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🚀 Live Demo

https://elfitech-it-school-autumn2025-verce-one.vercel.app/

## ✨ Features

### 🛍️ Core Shopping Experience
- **Flower Catalog**: Browse beautiful flowers from multiple shops
- **Advanced Filtering**: Filter by shop categories (Premium, Budget, Luxury, Seasonal)
- **Smart Sorting**: Sort by name, price (low to high, high to low), date added, or favorites first
- **Favorites System**: Mark flowers as favorites and view them in a dedicated page
- **Shopping Cart**: Add/remove items, adjust quantities with persistent storage

### 💳 Order Management
- **Customer Information Form**: Comprehensive order form with validation
- **Coupon System**: Apply discount codes with automatic validation
- **Order History**: Search and view past orders by email, phone, or order ID
- **Order Confirmation**: Beautiful order success page with detailed information

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, elegant design with smooth animations
- **Pagination**: Efficient browsing of large flower catalogs
- **Local Storage**: Persistent cart and favorites across sessions

### 🧭 Navigation
- **React Router**: Seamless navigation between pages
- **Header Navigation**: Easy access to all sections with active states
- **Footer Links**: Additional navigation and company information

## 🏗️ Project Architecture

```
src/
├── components/           # Reusable UI components
│   ├── CartItem.tsx     # Individual cart item component
│   ├── CartView.tsx     # Shopping cart page
│   ├── CouponCard.tsx   # Coupon display component
│   ├── FlowerCard.tsx   # Individual flower display
│   ├── Footer.tsx       # Application footer
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Main layout wrapper
│   ├── OrderForm.tsx    # Customer order form
│   ├── OrderSuccess.tsx # Order confirmation page
│   ├── Pagination.tsx   # Pagination controls
│   ├── ShopSidebar.tsx  # Shop filtering sidebar
│   ├── ShopView.tsx     # Main shop browsing page
│   └── SortControls.tsx # Sorting dropdown
├── contexts/            # React Context for state management
│   └── AppContext.tsx   # Global application state
├── data/               # Static data and mock data
│   ├── coupons.ts      # Coupon definitions
│   └── mockData.ts     # Flower and shop data
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── pages/              # Page components
│   ├── CouponsPage.tsx # Coupons and deals page
│   ├── FavoritesPage.tsx # User favorites page
│   └── HistoryPage.tsx # Order history page
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── App.tsx             # Main application component
├── index.css           # Global styles and Tailwind imports
└── main.tsx           # Application entry point
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for beautiful icons
- **Build Tool**: Vite for fast development and building
- **State Management**: React Context API with useReducer
- **Data Persistence**: Local Storage for cart and favorites
- **Code Quality**: ESLint with TypeScript support

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flower-delivery-app.git
cd flower-delivery-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

### 5. Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure Details

### Components Architecture

The application follows a modular component architecture:

- **Layout Components**: `Header`, `Footer`, `Layout` provide the application shell
- **Feature Components**: `ShopView`, `CartView`, `OrderForm` handle main functionality
- **UI Components**: `FlowerCard`, `CouponCard`, `Pagination` provide reusable UI elements
- **Page Components**: Located in `/pages` directory for route-specific content

### State Management

The application uses React Context API with useReducer for state management:

```typescript
interface AppState {
  flowers: Flower[];
  cart: CartItem[];
  selectedShop: string | null;
  sortBy: SortOption;
  orders: Order[];
  appliedCoupons: Coupon[];
  currentPage: number;
  itemsPerPage: number;
}
```

### Data Flow

1. **User Actions** → Dispatch actions to context
2. **Context Reducer** → Updates global state
3. **Components** → Re-render with new state
4. **Local Storage** → Persists cart and favorites

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradients (`from-purple-500 to-pink-500`)
- **Secondary**: Pink and indigo accents
- **Success**: Green tones for confirmations
- **Warning**: Yellow/orange for alerts
- **Error**: Red tones for errors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable with proper line spacing
- **Interactive Elements**: Medium weight for buttons and links

### Spacing System
- Based on Tailwind's 8px grid system
- Consistent margins and padding throughout
- Responsive spacing adjustments

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_APP_TITLE=Flower Delivery App
VITE_API_URL=your-api-url-here
```

### Tailwind Configuration

The project uses a custom Tailwind configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
```

## 🧪 Testing

### Running Tests

```bash
npm run test
# or
yarn test
```

### Test Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📦 Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for React Router in `public/_redirects`:

```
/*    /index.html   200
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:

```json
{
  "homepage": "https://yourusername.github.io/flower-delivery-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new files
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

## 🐛 Troubleshooting

### Common Issues

**Issue**: Development server won't start
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Build fails
**Solution**: Check for TypeScript errors and fix them:
```bash
npm run lint
```

**Issue**: Styles not loading
**Solution**: Ensure Tailwind CSS is properly configured and imported in `src/index.css`

## 📈 Performance Optimization

- **Code Splitting**: Implemented with React.lazy for route-based splitting
- **Image Optimization**: Using optimized Pexels URLs with compression
- **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size
- **Caching**: Local storage for cart and favorites reduces API calls

## 🔒 Security Considerations

- **Input Validation**: All form inputs are validated
- **XSS Prevention**: React's built-in XSS protection
- **Data Sanitization**: User inputs are properly sanitized
- **HTTPS**: Always use HTTPS in production

## 📊 Analytics and Monitoring

Consider adding:
- Google Analytics for user behavior tracking
- Error monitoring with Sentry
- Performance monitoring with Web Vitals
- User feedback collection

## 🔮 Future Enhancements

- **Payment Integration**: Stripe or PayPal integration
- **User Authentication**: Login/register functionality
- **Real-time Updates**: WebSocket for order status updates
- **Push Notifications**: Order confirmations and updates
- **Advanced Search**: Full-text search with filters
- **Wishlist Sharing**: Share favorite flowers with friends
- **Reviews and Ratings**: Customer feedback system
- **Multi-language Support**: Internationalization (i18n)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: Senior React/TypeScript Developer
- **UI/UX Designer**: Modern, responsive design
- **Project Manager**: Agile development methodology

## 📞 Support

For support, email support@flowerdelivery.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- **Pexels** for beautiful flower images
- **Lucide** for the icon library
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool

---

Made with ❤️ for flower lovers everywhere 🌸

## Changelog (Backend + Data + UI)

- Added a lightweight backend server (Node.js, Express, SQLite) with Swagger UI for API exploration.
- New API endpoints:
  - GET /api/shops — list shops
  - GET /api/flowers?shop_id=... — list flowers (filter by shop optionally)
  - PATCH /api/flowers/:id/favorite — toggle a flower's favorite state
  - GET /api/coupons — list coupons
  - GET /api/orders — list orders with items
  - POST /api/orders — create an order
- Database schema aligned to frontend types:
  - shops: added category
  - flowers: added image, description, date_added
  - coupons: added name, is_active, expiry_date, min_order_amount
- Database seeding: on first run, tables are auto-created and seeded with the same dataset as the frontend mock data.
- Frontend hybrid data source:
  - App loads mock data immediately for a fast first paint.
  - Then fetches real data from the API and updates UI when available (graceful fallback if API is down).
  - Favorites are merged with localStorage to preserve user preferences.
- Favorites sync: clicking the heart performs an optimistic UI update and a PATCH to the API to persist the change.
- Image fallback behavior: if a flower has no image or the image fails to load, the card displays a neutral placeholder with the text "no image".
- Configuration:
  - New env var VITE_API_URL to customize API base URL (defaults to http://localhost:4000).
- Scripts:
  - Added npm run server to start the API server (node server/index.js).
- Setup notes for backend:
  - Install server deps: npm i express cors better-sqlite3 swagger-ui-express
  - Start: npm run server
  - Swagger: http://localhost:4000/api-docs
