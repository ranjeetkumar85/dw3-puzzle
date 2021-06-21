describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  xit('Then: I should be able to undo add book', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    let isClicked = false;
    cy.get('[data-testing="cta-add-to-reading-list"]').each((ele, index, list) => {
      if(ele[0].innerText === 'Want to Read' && !isClicked) {
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

    cy.get('.mat-simple-snackbar span').should("contain", 'Book removed from list');

  });

  it('Then: I should be able to mark finished the book', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    let isClicked = false;
    cy.get('[data-testing="cta-add-to-reading-list"]').each((ele, index, list) => {
      if(ele[0].innerText === 'Want to Read' && !isClicked) {
        ele.click();
        isClicked = true;
      }
    });

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    
    cy.get('[data-testing="toggle-finish-book"]').each((ele, index, list) => {
        ele[0].click();
        console.log('ele', ele);
        console.log('ele[0]', ele[0]);
        console.log('ele[0].className', ele[0].className);
    });
  });
});
