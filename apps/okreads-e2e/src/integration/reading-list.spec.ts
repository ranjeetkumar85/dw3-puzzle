import { $, $$, browser, By, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    await $$('[data-testing="toggle-reading-list"]').click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
});

describe('When: I use the reading list undo feature', () => {
  beforeEach(async () => {
    await browser.get('/');
    const form = $('form');
    const input = $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
  });

  it('Then: I should be able to add book to list', async () => {
    await $$('[data-testing="book-item"] button:enabled').first().click();

    const newReadingListCount = await $('[data-testing="total-count"]').getText();
    expect(Number(newReadingListCount)).toBeGreaterThan(0);
  });

  it('Then: I should be able to undo when I add book to list', async () => {
    const readingListCount = await $('[data-testing="total-count"]').getText();
    await $$('[data-testing="book-item"] button:enabled').first().click();
    await browser.driver.findElement(By.tagName('.mat-simple-snackbar-action button')).click();

    const newReadingListCount = await $('[data-testing="total-count"]').getText();
    expect(readingListCount).toEqual(newReadingListCount);
  });

  it('Then: I should be able to undo remove book from reading list', async () => {
    await $$('[data-testing="book-item"] button:enabled').first().click();
    await $$('[data-testing="toggle-reading-list"]').click();
    const readingListCount = await $('[data-testing="total-count"]').getText();
    await $$('[data-testing="remove-from-list"]').first().click();
    await browser.driver.findElement(By.tagName('.mat-simple-snackbar-action button')).click();

    const newReadingListCount = await $('[data-testing="total-count"]').getText();
    expect(readingListCount).toEqual(newReadingListCount);
  });
});
