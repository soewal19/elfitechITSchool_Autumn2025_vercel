describe('Flower Shop E-commerce Application', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(2000) // Wait for initial loading
  })

  describe('Homepage and Navigation', () => {
    it('should load the homepage successfully', () => {
      cy.get('h1').should('contain', 'Flower Delivery')
      cy.get('[data-testid="flower-card"]').should('have.length.at.least', 1)
      cy.takeScreenshot('homepage-loaded')
    })

    it('should navigate between pages', () => {
      // Test navigation to different pages
      cy.get('nav').contains('Favorites').click()
      cy.url().should('include', '/favorites')
      cy.get('h1').should('contain', 'My Favorites')

      cy.get('nav').contains('Coupons').click()
      cy.url().should('include', '/coupons')
      cy.get('h1').should('contain', 'Special Offers')

      cy.get('nav').contains('History').click()
      cy.url().should('include', '/history')
      cy.get('h1').should('contain', 'Order History')

      cy.get('nav').contains('Shop').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should be responsive on different screen sizes', () => {
      cy.checkResponsive()
      cy.takeScreenshot('responsive-test')
    })
  })

  describe('Product Browsing and Filtering', () => {
    it('should display products with correct information', () => {
      cy.get('[data-testid="flower-card"]').first().within(() => {
        cy.get('img').should('be.visible')
        cy.get('h3').should('not.be.empty')
        cy.get('[data-testid="flower-price"]').should('contain', '$')
        cy.get('[data-testid="add-to-cart"]').should('be.visible')
        cy.get('[data-testid="favorite-button"]').should('be.visible')
      })
    })

    it('should filter products by shop', () => {
      // Click on a shop filter
      cy.get('[data-testid="shop-filter"]').first().click()
      cy.wait(1000)
      
      // Verify products are filtered
      cy.get('[data-testid="flower-card"]').should('have.length.at.least', 1)
      cy.get('h2').should('contain', 'Shop Flowers')
    })

    it('should sort products correctly', () => {
      // Test price sorting
      cy.get('[data-testid="sort-select"]').select('price-low')
      cy.wait(1000)
      
      // Verify sorting by checking first few prices
      cy.get('[data-testid="flower-price"]').then(($prices) => {
        const prices = Array.from($prices).map(el => 
          parseFloat(el.textContent?.replace('$', '') || '0')
        )
        expect(prices[0]).to.be.at.most(prices[1])
      })
    })

    it('should handle pagination correctly', () => {
      // Test pagination if there are enough items
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="pagination"]').length > 0) {
          cy.get('[data-testid="pagination"]').within(() => {
            cy.get('button').contains('Next').click()
            cy.wait(1000)
            cy.get('button').contains('Previous').should('not.be.disabled')
          })
        }
      })
    })

    it('should change items per page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="items-per-page"]').length > 0) {
          cy.get('[data-testid="items-per-page"]').select('16')
          cy.wait(1000)
          cy.get('[data-testid="flower-card"]').should('have.length.at.most', 16)
        }
      })
    })
  })

  describe('Shopping Cart Functionality', () => {
    it('should add items to cart', () => {
      // Add first flower to cart
      cy.get('[data-testid="flower-card"]').first().within(() => {
        cy.get('h3').invoke('text').as('flowerName')
        cy.get('[data-testid="add-to-cart"]').click()
      })

      // Check cart counter
      cy.get('[data-testid="cart-counter"]').should('contain', '1')
      
      // Navigate to cart
      cy.get('nav').contains('Cart').click()
      cy.get('[data-testid="cart-item"]').should('have.length', 1)
    })

    it('should update cart quantities', () => {
      // Add item to cart first
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
      
      // Go to cart
      cy.get('nav').contains('Cart').click()
      
      // Increase quantity
      cy.get('[data-testid="cart-item"]').first().within(() => {
        cy.get('[data-testid="increase-quantity"]').click()
        cy.get('[data-testid="quantity"]').should('contain', '2')
      })
    })

    it('should remove items from cart', () => {
      // Add item to cart first
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
      
      // Go to cart
      cy.get('nav').contains('Cart').click()
      
      // Remove item
      cy.get('[data-testid="cart-item"]').first().find('[data-testid="remove-item"]').click()
      cy.get('[data-testid="cart-item"]').should('have.length', 0)
      cy.contains('Your cart is empty').should('be.visible')
    })
  })

  describe('Checkout Process', () => {
    beforeEach(() => {
      // Add items to cart before each checkout test
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
      cy.get('nav').contains('Cart').click()
    })

    it('should validate customer information form', () => {
      // Try to submit without filling form
      cy.get('[data-testid="submit-order"]').click()
      
      // Check for validation errors
      cy.get('[data-testid="name-error"]').should('be.visible')
      cy.get('[data-testid="email-error"]').should('be.visible')
      cy.get('[data-testid="phone-error"]').should('be.visible')
      cy.get('[data-testid="address-error"]').should('be.visible')
    })

    it('should complete checkout process', () => {
      // Fill customer form
      cy.fillCustomerForm({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St, City, State 12345'
      })

      // Submit order
      cy.get('[data-testid="submit-order"]').click()
      cy.wait(2000)

      // Verify order success
      cy.get('[data-testid="order-success"]').should('be.visible')
      cy.get('[data-testid="order-id"]').should('not.be.empty')
      cy.takeScreenshot('order-success')
    })

    it('should apply coupon codes', () => {
      // Try to apply a coupon
      cy.get('[data-testid="coupon-input"]').type('SPRING20')
      cy.get('[data-testid="apply-coupon"]').click()
      
      // Check if coupon is applied (might show success or error)
      cy.get('body').should('contain.text', 'SPRING20')
    })
  })

  describe('Favorites Functionality', () => {
    it('should add and remove favorites', () => {
      // Add to favorites
      cy.get('[data-testid="flower-card"]').first().within(() => {
        cy.get('[data-testid="favorite-button"]').click()
      })

      // Check favorites counter
      cy.get('[data-testid="favorites-counter"]').should('contain', '1')

      // Navigate to favorites page
      cy.get('nav').contains('Favorites').click()
      cy.get('[data-testid="flower-card"]').should('have.length', 1)

      // Remove from favorites
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="favorite-button"]').click()
      cy.contains('No Favorites Yet').should('be.visible')
    })
  })

  describe('Analytics Dashboard', () => {
    it('should display analytics dashboard', () => {
      // Show analytics
      cy.get('[data-testid="show-analytics"]').click()
      cy.wait(2000)

      // Verify dashboard elements
      cy.get('[data-testid="analytics-dashboard"]').should('be.visible')
      cy.get('[data-testid="revenue-card"]').should('be.visible')
      cy.get('[data-testid="orders-card"]').should('be.visible')
      cy.get('[data-testid="sales-chart"]').should('be.visible')
      
      cy.takeScreenshot('analytics-dashboard')
    })

    it('should interact with charts', () => {
      cy.get('[data-testid="show-analytics"]').click()
      cy.wait(2000)

      // Test time range selector
      cy.get('[data-testid="time-range-select"]').select('7d')
      cy.wait(1000)
      
      // Charts should still be visible after filter change
      cy.get('[data-testid="sales-chart"]').should('be.visible')
    })
  })

  describe('Google Maps Integration', () => {
    beforeEach(() => {
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
      cy.get('nav').contains('Cart').click()
    })

    it('should display interactive map', () => {
      // Open map
      cy.get('[data-testid="select-on-map"]').click()
      cy.wait(1000)

      // Verify map elements
      cy.get('[data-testid="google-map"]').should('be.visible')
      cy.get('[data-testid="use-current-location"]').should('be.visible')
      cy.get('[data-testid="shop-marker"]').should('have.length.at.least', 1)
    })

    it('should select delivery location', () => {
      // Open map
      cy.get('[data-testid="select-on-map"]').click()
      cy.wait(1000)

      // Click on map to select location
      cy.get('[data-testid="google-map"]').click(400, 200)
      cy.wait(500)

      // Verify address is filled
      cy.get('[data-testid="customer-address"]').should('not.have.value', '')
    })
  })

  describe('Order History', () => {
    it('should search orders by email', () => {
      cy.get('nav').contains('History').click()
      
      // Search by email
      cy.get('[data-testid="search-email"]').type('john.doe@example.com')
      cy.wait(1000)
      
      // Results should be filtered or show no results message
      cy.get('body').should('contain.text', 'john.doe@example.com').or('contain.text', 'No Orders Found')
    })

    it('should search orders by phone', () => {
      cy.get('nav').contains('History').click()
      
      // Search by phone
      cy.get('[data-testid="search-phone"]').type('1234567890')
      cy.wait(1000)
      
      // Results should be filtered or show no results message
      cy.get('body').should('contain.text', '1234567890').or('contain.text', 'No Orders Found')
    })
  })

  describe('Performance and Loading', () => {
    it('should load pages within acceptable time', () => {
      const startTime = Date.now()
      
      cy.visit('/').then(() => {
        const loadTime = Date.now() - startTime
        expect(loadTime).to.be.lessThan(5000) // 5 seconds max
      })
    })

    it('should handle skeleton loading states', () => {
      cy.visit('/')
      
      // Check for skeleton loaders during initial load
      cy.get('[data-testid="skeleton-loader"]', { timeout: 1000 }).should('exist')
      
      // Wait for content to load
      cy.get('[data-testid="flower-card"]', { timeout: 10000 }).should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid coupon codes gracefully', () => {
      cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
      cy.get('nav').contains('Cart').click()
      
      // Try invalid coupon
      cy.get('[data-testid="coupon-input"]').type('INVALID123')
      cy.get('[data-testid="apply-coupon"]').click()
      
      // Should show error message
      cy.get('[data-testid="coupon-error"]').should('be.visible')
    })

    it('should handle empty cart checkout attempt', () => {
      cy.get('nav').contains('Cart').click()
      
      // Try to checkout with empty cart
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="submit-order"]').length > 0) {
          cy.get('[data-testid="submit-order"]').should('be.disabled')
        }
      })
    })
  })
})