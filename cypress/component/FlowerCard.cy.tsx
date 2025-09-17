import React from 'react'
import { FlowerCard } from '../../src/components/FlowerCard'
import { AppProvider } from '../../src/contexts/AppContext'
import { Flower } from '../../src/types'

const mockFlower: Flower = {
  id: '1',
  name: 'Red Rose Bouquet',
  price: 45,
  image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
  description: 'Beautiful red roses perfect for romantic occasions',
  shopId: '1',
  isFavorite: false,
  dateAdded: new Date('2024-01-15')
}

describe('FlowerCard Component', () => {
  it('should render flower information correctly', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    cy.get('[data-testid="flower-card"]').should('be.visible')
    cy.get('h3').should('contain', 'Red Rose Bouquet')
    cy.get('[data-testid="flower-price"]').should('contain', '$45')
    cy.get('img').should('have.attr', 'src', mockFlower.image)
    cy.get('img').should('have.attr', 'alt', mockFlower.name)
  })

  it('should handle add to cart action', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    cy.get('[data-testid="add-to-cart"]').click()
    // Note: In a real test, you'd verify the cart state change
    // This would require access to the context or a mock function
  })

  it('should handle favorite toggle', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    cy.get('[data-testid="favorite-button"]').click()
    // The heart should change appearance when favorited
    cy.get('[data-testid="favorite-button"]').should('have.class', 'bg-red-500')
  })

  it('should display shop information', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    // Shop name should be displayed
    cy.get('.text-xs').should('contain', 'Flowery Fragrant')
  })

  it('should handle hover effects', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    cy.get('[data-testid="flower-card"]').trigger('mouseover')
    cy.get('[data-testid="flower-card"]').should('have.class', 'hover:shadow-xl')
  })

  it('should be accessible', () => {
    cy.mount(
      <AppProvider>
        <FlowerCard flower={mockFlower} />
      </AppProvider>
    )

    // Check for proper alt text
    cy.get('img').should('have.attr', 'alt')
    
    // Check for proper button labels
    cy.get('[data-testid="add-to-cart"]').should('contain', 'Add to Cart')
    
    // Check for proper heading structure
    cy.get('h3').should('exist')
  })

  it('should handle different flower types', () => {
    const tulipFlower: Flower = {
      ...mockFlower,
      id: '2',
      name: 'White Tulips',
      price: 32,
      description: 'Elegant white tulips for special celebrations'
    }

    cy.mount(
      <AppProvider>
        <FlowerCard flower={tulipFlower} />
      </AppProvider>
    )

    cy.get('h3').should('contain', 'White Tulips')
    cy.get('[data-testid="flower-price"]').should('contain', '$32')
  })

  it('should handle long flower names gracefully', () => {
    const longNameFlower: Flower = {
      ...mockFlower,
      name: 'Very Long Flower Name That Should Be Handled Gracefully Without Breaking Layout'
    }

    cy.mount(
      <AppProvider>
        <FlowerCard flower={longNameFlower} />
      </AppProvider>
    )

    cy.get('h3').should('be.visible')
    cy.get('[data-testid="flower-card"]').should('have.css', 'overflow', 'hidden')
  })

  it('should handle image loading errors', () => {
    const brokenImageFlower: Flower = {
      ...mockFlower,
      image: 'https://broken-image-url.com/image.jpg'
    }

    cy.mount(
      <AppProvider>
        <FlowerCard flower={brokenImageFlower} />
      </AppProvider>
    )

    // Image should still have proper alt text even if it fails to load
    cy.get('img').should('have.attr', 'alt', brokenImageFlower.name)
  })
})