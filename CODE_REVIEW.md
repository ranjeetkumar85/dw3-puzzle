***Are there any problems or code smells in the app? (Focus on code in the `libs/books` folder)***
1. Observable used for `this.store.select(getAllBooks)` is not unsubscribed in `book-search.component.ts` file. This may lead to memory leak and performance issue. 
    - Added async pipe in 'book-search.component.html' file line#33 to avoid memory leak. Async pipe will automatically unsubscribe the observable once component is destroyed. 
2. Custom method `formateDate()` is being used for date format in `book-search.component.html` at line#45. 
    - We can use pipe instead to convert date into required format. This will help in performance improvement since function will be triggered everytime on change detection and wherein having pipe would evaluate the expression only once.
3. Actions - `addToReadingList` & `removeFromReadingList` - in `reading-list.reducer.ts` file triggers the effects to call API to add & remove book to & from reading list and at the same time it updates the state by reducer without checking success or failure of backend APIs.
    - Corrected the same and updated store only on success action `confirmedAddToReadingList` & `confirmedRemoveFromReadingList`
4. Naming convention is not proper in `book-search.component.html` at line#33.
    - Corrected naming convention in `book-search.component.html`.
5. Mobile UX was not correctly rendered. Book sections, reading list and buttons were overlapping. Corrected mobile view to provide better user experience. 
6. Test case was broken for reading-list reducer because `failedAddToReadingList` and `failedRemoveFromReadingList` were not implemented in reducer.
7. Type Notation is missing for below functions. Added type notation in `reading-List.component.ts` & `reading-list.reducer.ts`.
    - addBookToReadingList
    - searchExample
    - searchBooks
    - removeFromReadingList


***Are there other improvements you would make to the app? What are they and why?***
1. Spinner should be implemented for better user experience for search API. `Implemented`
2. Error handling is not proper for the API failure scenario. It should display error message when there is a failure. Updated code to display error message. `Implemented`
3. Used `ChangeDetectionStrategy.OnPush` in `book-search.component.html` since we don't change the state of the objects in component. It will perform better rather than default where each change of the object makes run change detector to resolve changes.

***Accessibility***
- **Ran authomated scan using light house and corrected issues.**
  - Issue1- Buttons do not have an accessible name. `FIXED`
  - Issue2 - Background and foreground do not have a sufficient contrast ratio. `FIXED`


- **Manually checked using NVDA Accessiblity tool**
  - Search icon was reading as button. Added `aria-label` to make this more meaningful for the user. `FIXED`
  - Reading `Reading List` along with header an focus was not moving correctly. `Fixed`
  - Background color of Reading list button was same as header. Changed it to pink-dark color to make it visible to the user. `FIXED`

- `Javascript` is wrapped in anchor tag in `book-search.component.html` even this is not bing used for redirection. Changed it to Button. `FIXED`
- `Want to read` button is not with Book name. Corrected `area-label` with book name. `FIXED`