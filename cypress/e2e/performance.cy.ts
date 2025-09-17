describe('Performance Tests', () => {
  beforeEach(() => {
    // Clear any previous performance marks
    cy.window().then((win) => {
      win.performance.clearMarks()
      win.performance.clearMeasures()
    })
  })

  it('should load the homepage within performance budget', () => {
    const startTime = Date.now()
    
    cy.visit('/')
    
    // Wait for page to be fully loaded
    cy.get('[data-testid="flower-card"]').should('be.visible')
    
    cy.then(() => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(3000) // 3 seconds budget
      cy.log(`Page load time: ${loadTime}ms`)
    })
  })

  it('should measure Core Web Vitals', () => {
    cy.visit('/')
    
    cy.window().then((win) => {
      // Measure First Contentful Paint (FCP)
      cy.wrap(null).then(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                expect(entry.startTime).to.be.lessThan(2500) // 2.5s budget
                cy.log(`FCP: ${entry.startTime}ms`)
                resolve(entry.startTime)
              }
            })
          }).observe({ entryTypes: ['paint'] })
        })
      })
      
      // Measure Largest Contentful Paint (LCP)
      cy.wrap(null).then(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              expect(lastEntry.startTime).to.be.lessThan(4000) // 4s budget
              cy.log(`LCP: ${lastEntry.startTime}ms`)
              resolve(lastEntry.startTime)
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] })
        })
      })
    })
  })

  it('should handle large datasets efficiently', () => {
    cy.visit('/')
    
    // Show analytics dashboard with charts
    cy.get('[data-testid="show-analytics"]').click()
    
    const startTime = Date.now()
    
    // Wait for charts to render
    cy.get('[data-testid="sales-chart"]').should('be.visible')
    cy.get('[data-testid="analytics-dashboard"]').should('be.visible')
    
    cy.then(() => {
      const renderTime = Date.now() - startTime
      expect(renderTime).to.be.lessThan(2000) // 2 seconds for chart rendering
      cy.log(`Chart render time: ${renderTime}ms`)
    })
  })

  it('should handle pagination efficiently', () => {
    cy.visit('/')
    
    // Change to maximum items per page
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="items-per-page"]').length > 0) {
        const startTime = Date.now()
        
        cy.get('[data-testid="items-per-page"]').select('24')
        cy.get('[data-testid="flower-card"]').should('have.length.at.most', 24)
        
        cy.then(() => {
          const paginationTime = Date.now() - startTime
          expect(paginationTime).to.be.lessThan(1000) // 1 second for pagination
          cy.log(`Pagination time: ${paginationTime}ms`)
        })
      }
    })
  })

  it('should handle search and filtering efficiently', () => {
    cy.visit('/')
    
    const startTime = Date.now()
    
    // Apply shop filter
    cy.get('[data-testid="shop-filter"]').first().click()
    cy.wait(500)
    
    // Apply sorting
    cy.get('[data-testid="sort-select"]').select('price-low')
    cy.get('[data-testid="flower-card"]').should('be.visible')
    
    cy.then(() => {
      const filterTime = Date.now() - startTime
      expect(filterTime).to.be.lessThan(1500) // 1.5 seconds for filtering
      cy.log(`Filter and sort time: ${filterTime}ms`)
    })
  })

  it('should handle cart operations efficiently', () => {
    cy.visit('/')
    
    const startTime = Date.now()
    
    // Add multiple items to cart quickly
    cy.get('[data-testid="flower-card"]').each(($card, index) => {
      if (index < 5) { // Add first 5 items
        cy.wrap($card).find('[data-testid="add-to-cart"]').click()
      }
    })
    
    // Navigate to cart
    cy.get('nav').contains('Cart').click()
    cy.get('[data-testid="cart-item"]').should('have.length', 5)
    
    cy.then(() => {
      const cartTime = Date.now() - startTime
      expect(cartTime).to.be.lessThan(2000) // 2 seconds for cart operations
      cy.log(`Cart operations time: ${cartTime}ms`)
    })
  })

  it('should handle map rendering efficiently', () => {
    cy.visit('/')
    
    // Add item and go to cart
    cy.get('[data-testid="flower-card"]').first().find('[data-testid="add-to-cart"]').click()
    cy.get('nav').contains('Cart').click()
    
    const startTime = Date.now()
    
    // Open map
    cy.get('[data-testid="select-on-map"]').click()
    cy.get('[data-testid="google-map"]').should('be.visible')
    
    cy.then(() => {
      const mapTime = Date.now() - startTime
      expect(mapTime).to.be.lessThan(2000) // 2 seconds for map rendering
      cy.log(`Map render time: ${mapTime}ms`)
    })
  })

  it('should handle image loading efficiently', () => {
    cy.visit('/')
    
    // Check that images load within reasonable time
    cy.get('[data-testid="flower-card"] img').each(($img) => {
      cy.wrap($img).should('be.visible')
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
      
      // Check if image is actually loaded
      cy.wrap($img).should(($el) => {
        expect($el[0].complete).to.be.true
        expect($el[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })

  it('should maintain performance during user interactions', () => {
    cy.visit('/')
    
    // Simulate rapid user interactions
    const startTime = Date.now()
    
    // Rapid favorite toggling
    cy.get('[data-testid="flower-card"]').each(($card, index) => {
      if (index < 3) {
        cy.wrap($card).find('[data-testid="favorite-button"]').click()
        cy.wait(100)
        cy.wrap($card).find('[data-testid="favorite-button"]').click()
      }
    })
    
    // Rapid sorting changes
    cy.get('[data-testid="sort-select"]').select('price-high')
    cy.wait(200)
    cy.get('[data-testid="sort-select"]').select('name')
    cy.wait(200)
    cy.get('[data-testid="sort-select"]').select('date')
    
    cy.get('[data-testid="flower-card"]').should('be.visible')
    
    cy.then(() => {
      const interactionTime = Date.now() - startTime
      expect(interactionTime).to.be.lessThan(3000) // 3 seconds for rapid interactions
      cy.log(`Rapid interactions time: ${interactionTime}ms`)
    })
  })

  it('should handle memory usage efficiently', () => {
    cy.visit('/')
    
    cy.window().then((win) => {
      // Check initial memory usage if available
      if ('memory' in win.performance) {
        const initialMemory = (win.performance as any).memory.usedJSHeapSize
        cy.log(`Initial memory usage: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`)
        
        // Perform memory-intensive operations
        cy.get('[data-testid="show-analytics"]').click()
        cy.wait(2000)
        
        // Navigate through pages
        cy.get('nav').contains('Favorites').click()
        cy.wait(500)
        cy.get('nav').contains('Coupons').click()
        cy.wait(500)
        cy.get('nav').contains('History').click()
        cy.wait(500)
        cy.get('nav').contains('Shop').click()
        cy.wait(500)
        
        cy.then(() => {
          const finalMemory = (win.performance as any).memory.usedJSHeapSize
          const memoryIncrease = finalMemory - initialMemory
          cy.log(`Final memory usage: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`)
          cy.log(`Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`)
          
          // Memory increase should be reasonable (less than 50MB)
          expect(memoryIncrease).to.be.lessThan(50 * 1024 * 1024)
        })
      }
    })
  })
})