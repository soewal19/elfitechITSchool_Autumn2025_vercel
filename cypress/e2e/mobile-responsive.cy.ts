describe('Mobile Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 414, height: 896, name: 'iPhone XR' },
    { width: 768, height: 1024, name: 'iPad' },
    { width: 1024, height: 768, name: 'iPad Landscape' }
  ]

  viewports.forEach((viewport) => {
    describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        cy.wait(2000)
      })

      it('should display mobile navigation correctly', () => {
        if (viewport.width < 768) {
          // Mobile navigation should be visible
          cy.get('[data-testid="mobile-nav"]').should('be.visible')
          cy.get('[data-testid="desktop-nav"]').should('not.be.visible')
        } else {
          // Desktop navigation should be visible
          cy.get('[data-testid="desktop-nav"]').should('be.visible')
        }
        
        cy.takeScreenshot(`navigation-${viewport.name}`)
      })

      it('should display flower cards in appropriate grid', () => {
        cy.get('[data-testid="flower-card"]').should('be.visible')
        
        // Check grid layout based on viewport
        if (viewport.width < 640) {
          // Mobile: 1 column
          cy.get('[data-testid="flowers-grid"]').should('have.class', 'grid-cols-1')
        } else if (viewport.width < 1024) {
          // Tablet: 2 columns
          cy.get('[data-testid="flowers-grid"]').should('have.class', 'sm:grid-cols-2')
        }
        
        cy.takeScreenshot(`flower-grid-${viewport.name}`)
      })

      it('should handle cart functionality on mobile', () => {
        // Add item to cart
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
        
        // Navigate to cart
        cy.get('nav').contains('Cart').click()
        cy.wait(1000)
        
        // Verify cart item is displayed properly
        cy.get('[data-testid="cart-item"]').should('be.visible')
        
        // Test quantity controls
        cy.get('[data-testid="increase-quantity"]').should('be.visible').click()
        cy.get('[data-testid="quantity"]').should('contain', '2')
        
        cy.takeScreenshot(`cart-mobile-${viewport.name}`)
      })

      it('should display checkout form properly', () => {
        // Add item and go to cart
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
        cy.get('nav').contains('Cart').click()
        
        // Check form layout
        cy.get('[data-testid="customer-name"]').should('be.visible')
        cy.get('[data-testid="customer-email"]').should('be.visible')
        cy.get('[data-testid="customer-phone"]').should('be.visible')
        cy.get('[data-testid="customer-address"]').should('be.visible')
        
        // Form should be properly sized for mobile
        cy.get('[data-testid="order-form"]').should('be.visible')
        
        cy.takeScreenshot(`checkout-form-${viewport.name}`)
      })

      it('should handle map interaction on mobile', () => {
        // Add item and go to cart
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
        cy.get('nav').contains('Cart').click()
        
        // Open map
        cy.get('[data-testid="select-on-map"]').click()
        cy.wait(1000)
        
        // Map should be responsive
        cy.get('[data-testid="google-map"]').should('be.visible')
        cy.get('[data-testid="use-current-location"]').should('be.visible')
        
        // Touch interaction should work
        cy.get('[data-testid="google-map"]').trigger('touchstart', { touches: [{ clientX: 200, clientY: 200 }] })
        cy.get('[data-testid="google-map"]').trigger('touchend')
        
        cy.takeScreenshot(`map-mobile-${viewport.name}`)
      })

      it('should display analytics dashboard responsively', () => {
        // Show analytics
        cy.get('[data-testid="show-analytics"]').click()
        cy.wait(2000)
        
        // Dashboard should be visible and responsive
        cy.get('[data-testid="analytics-dashboard"]').should('be.visible')
        
        // Charts should be responsive
        cy.get('[data-testid="sales-chart"]').should('be.visible')
        
        // Summary cards should stack properly on mobile
        if (viewport.width < 768) {
          cy.get('[data-testid="summary-cards"]').should('have.class', 'grid-cols-1')
        }
        
        cy.takeScreenshot(`analytics-mobile-${viewport.name}`)
      })

      it('should handle pagination on mobile', () => {
        // Check if pagination exists
        cy.get('body').then(($body) => {
          if ($body.find('[data-testid="pagination"]').length > 0) {
            cy.get('[data-testid="pagination"]').should('be.visible')
            
            // Pagination controls should be appropriately sized
            cy.get('[data-testid="pagination"] button').should('have.length.at.least', 2)
            
            // Test page navigation
            cy.get('[data-testid="pagination"] button').contains('Next').click()
            cy.wait(1000)
            
            cy.takeScreenshot(`pagination-mobile-${viewport.name}`)
          }
        })
      })

      it('should handle touch interactions', () => {
        // Test touch interactions on flower cards
        cy.get('[data-testid="flower-card"]').first().trigger('touchstart')
        cy.get('[data-testid="flower-card"]').first().trigger('touchend')
        
        // Test favorite button touch
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="favorite-button"]').trigger('touchstart')
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="favorite-button"]').trigger('touchend')
        
        // Verify favorite was toggled
        cy.get('[data-testid="favorites-counter"]').should('contain', '1')
        
        cy.takeScreenshot(`touch-interactions-${viewport.name}`)
      })

      it('should display text at readable sizes', () => {
        // Check that text is readable on mobile
        cy.get('h1').should('have.css', 'font-size').and('match', /\d+px/)
        cy.get('h2').should('have.css', 'font-size').and('match', /\d+px/)
        cy.get('p').should('have.css', 'font-size').and('match', /\d+px/)
        
        // Buttons should be touch-friendly (at least 44px)
        cy.get('[data-testid="add-to-cart"]').first().should('have.css', 'min-height').and('match', /\d+px/)
        
        cy.takeScreenshot(`typography-${viewport.name}`)
      })
    })
  })

  describe('Cross-device consistency', () => {
    it('should maintain functionality across all devices', () => {
      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        cy.wait(1000)
        
        // Basic functionality should work on all devices
        cy.get('[data-testid="flower-card"]').should('be.visible')
        cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
        cy.get('[data-testid="cart-counter"]').should('contain', '1')
        
        // Clear cart for next iteration
        cy.get('nav').contains('Cart').click()
        cy.get('[data-testid="cart-item"]').first().find('[data-testid="remove-item"]').click()
      })
    })
  })
})