describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });
  
});
