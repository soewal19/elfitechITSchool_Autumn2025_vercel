// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch
  win.fetch = function (...args) {
    return originalFetch.apply(this, args)
  }
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="page-loaded"]', { timeout: 10000 }).should('exist')
})

// Custom command to add items to cart
Cypress.Commands.add('addToCart', (flowerName: string, quantity: number = 1) => {
  for (let i = 0; i < quantity; i++) {
    cy.contains('.flower-card', flowerName)
      .find('[data-testid="add-to-cart"]')
      .click()
  }
})

// Custom command to fill customer form
Cypress.Commands.add('fillCustomerForm', (customerData: {
  name: string
  email: string
  phone: string
  address: string
}) => {
  cy.get('[data-testid="customer-name"]').type(customerData.name)
  cy.get('[data-testid="customer-email"]').type(customerData.email)
  cy.get('[data-testid="customer-phone"]').type(customerData.phone)
  cy.get('[data-testid="customer-address"]').type(customerData.address)
})

declare global {
  namespace Cypress {
    interface Chainable {
      waitForPageLoad(): Chainable<void>
      addToCart(flowerName: string, quantity?: number): Chainable<void>
      fillCustomerForm(customerData: {
        name: string
        email: string
        phone: string
        address: string
      }): Chainable<void>
    }
  }
}