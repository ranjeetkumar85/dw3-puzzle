describe('When: I use the reading list feature', () => {
  let readingItemsCount = 0;
  beforeEach(() => {
    cy.startAt('/');
    readingItemsCount = cy.$$('[data-testing="reading-list-item"]').length;
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to mark finished the book', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    cy.get('[data-testing="cta-add-to-reading-list"]:enabled').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-item"]').should('have.lengthOf.above', readingItemsCount);

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    
    cy.get('[data-testing="toggle-finish-book-cta"]').first().click();

    cy.get('[data-testing="toggle-finish-date"]').first().should('contain.text', 'Finish reading');

    cy.get('[data-testing="toggle-remove-book"]').first().click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount);
  });
});
