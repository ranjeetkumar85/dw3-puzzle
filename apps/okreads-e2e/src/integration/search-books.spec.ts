describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should be able to undo add book', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    let isClicked = false;
    cy.get('[data-testing="cta-add-to-reading-list"]').each((ele, index, list) => {
      if (ele[0].innerText === 'Want to Read' && !isClicked) {
        ele.click();
        isClicked = true;
      }
    });

    cy.wait(1000);

    cy.get('.mat-simple-snackbar span').should("contain", 'Book added to list');

    cy.get('.mat-simple-snackbar-action button').then(($els) => {
      cy.wait(3000);
      $els.click();
    });

  });

});
