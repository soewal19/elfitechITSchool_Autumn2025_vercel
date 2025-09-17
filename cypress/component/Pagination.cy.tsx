import React from 'react'
import { Pagination } from '../../src/components/Pagination'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 12,
    onPageChange: cy.stub().as('onPageChange'),
    onItemsPerPageChange: cy.stub().as('onItemsPerPageChange')
  }

  it('should render pagination controls correctly', () => {
    cy.mount(<Pagination {...defaultProps} />)

    cy.get('[data-testid="pagination"]').should('be.visible')
    cy.contains('Showing 1-12 of 100 items').should('be.visible')
    cy.get('button').contains('Previous').should('be.disabled')
    cy.get('button').contains('Next').should('not.be.disabled')
  })

  it('should handle page navigation', () => {
    cy.mount(<Pagination {...defaultProps} />)

    cy.get('button').contains('Next').click()
    cy.get('@onPageChange').should('have.been.calledWith', 2)

    cy.get('button').contains('2').click()
    cy.get('@onPageChange').should('have.been.calledWith', 2)
  })

  it('should handle go to page functionality', () => {
    cy.mount(<Pagination {...defaultProps} />)

    cy.get('[data-testid="go-to-page-input"]').type('5')
    cy.get('button').contains('Go').click()
    cy.get('@onPageChange').should('have.been.calledWith', 5)
  })

  it('should handle items per page change', () => {
    cy.mount(<Pagination {...defaultProps} />)

    cy.get('[data-testid="items-per-page"]').select('16')
    cy.get('@onItemsPerPageChange').should('have.been.calledWith', 16)
  })

  it('should validate go to page input', () => {
    cy.mount(<Pagination {...defaultProps} />)

    // Test invalid page number (too high)
    cy.get('[data-testid="go-to-page-input"]').type('15')
    cy.get('button').contains('Go').click()
    cy.get('@onPageChange').should('not.have.been.called')

    // Test invalid page number (too low)
    cy.get('[data-testid="go-to-page-input"]').clear().type('0')
    cy.get('button').contains('Go').click()
    cy.get('@onPageChange').should('not.have.been.called')
  })

  it('should show correct page numbers with ellipsis', () => {
    const propsWithManyPages = {
      ...defaultProps,
      currentPage: 5,
      totalPages: 20
    }

    cy.mount(<Pagination {...propsWithManyPages} />)

    cy.get('button').contains('1').should('be.visible')
    cy.contains('...').should('be.visible')
    cy.get('button').contains('5').should('be.visible')
    cy.get('button').contains('20').should('be.visible')
  })

  it('should handle edge cases', () => {
    // Test with only one page
    const singlePageProps = {
      ...defaultProps,
      totalPages: 1
    }

    cy.mount(<Pagination {...singlePageProps} />)
    cy.get('[data-testid="pagination"]').should('not.exist')
  })

  it('should handle last page correctly', () => {
    const lastPageProps = {
      ...defaultProps,
      currentPage: 10,
      totalPages: 10
    }

    cy.mount(<Pagination {...lastPageProps} />)

    cy.get('button').contains('Next').should('be.disabled')
    cy.get('button').contains('Previous').should('not.be.disabled')
    cy.contains('Showing 109-100 of 100 items').should('be.visible')
  })

  it('should be keyboard accessible', () => {
    cy.mount(<Pagination {...defaultProps} />)

    // Test keyboard navigation
    cy.get('button').contains('Next').focus()
    cy.focused().should('contain', 'Next')
    
    cy.get('[data-testid="go-to-page-input"]').focus()
    cy.focused().should('have.attr', 'type', 'number')
  })

  it('should handle rapid page changes', () => {
    cy.mount(<Pagination {...defaultProps} />)

    // Simulate rapid clicking
    cy.get('button').contains('Next').click()
    cy.get('button').contains('Next').click()
    cy.get('button').contains('Next').click()

    cy.get('@onPageChange').should('have.been.calledThrice')
  })
})