/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for taking screenshots with timestamp
Cypress.Commands.add('takeScreenshot', (name: string) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  cy.screenshot(`${name}-${timestamp}`)
})

// Custom command for checking responsive design
Cypress.Commands.add('checkResponsive', () => {
  // Desktop
  cy.viewport(1280, 720)
  cy.wait(500)
  
  // Tablet
  cy.viewport(768, 1024)
  cy.wait(500)
  
  // Mobile
  cy.viewport(375, 667)
  cy.wait(500)
  
  // Back to desktop
  cy.viewport(1280, 720)
})

// Custom command for waiting for animations
Cypress.Commands.add('waitForAnimation', (duration: number = 1000) => {
  cy.wait(duration)
})

declare global {
  namespace Cypress {
    interface Chainable {
      takeScreenshot(name: string): Chainable<void>
      checkResponsive(): Chainable<void>
      waitForAnimation(duration?: number): Chainable<void>
    }
  }
}

export {}