***Are there any problems or code smells in the app? (Focus on code in the `libs/books` folder)***
        - observable used for `this.store.select(getAllBooks)` is not unsubscribed in `book-search.component.ts` file. This may lead to memory leak and performance issue. 
          Added `async` pipe in `book-search.component.html` file line#33 to avoid memory leak. This unsubscribes observable internally.  

        - Custom method `formateDate()` is being used for date format in `book-search.component.html` at line#45.We can use pipe instead to convert date into required 
                format. This will help in performance improvement since function will be triggered everytime on change detection 
                and wherein having pipe would evaluate the expression only once.
        
        - Action(`addToReadingList` & `removeFromReadingList`) in `reading-list.reducer.ts` file triggers the effects to call API to add & remove book to & from reading list
          and at the same time it updates the state by reducer without checking success or failure of backend APIs.Corrected the same and updated store only 
          on success action 'confirmedAddToReadingList' & `confirmedRemoveFromReadingList`

        - Error Handling is not proper for the API failure scenarioseIn case if API is respoding with failure, error message should be dispalyed in case of API failure.Updated code to display error message.
        
        - Naming convention is not proper in `book-search.component.html` at line#33.Corrected Naming convention in 'book-search.component.html'.

        - Mobile UX was not correctly rendered. Book sections, reading list and buttons were overlapping. Corrected mobile view to provide better user experience. 

        - Test case was broken for reading-list reducer because **failedAddToReadingList** and **failedRemoveFromReadingList** were not implemented in reducer.

***Are there other improvements you would make to the app? What are they and why?***
    - Spinner should be implemented for better user experience for search API. [Implemented] 
    - Error message should be displayed for API failure.[Implemented]
    - Missing Type Notation on reading-list components "item" being of Type : <any>. Fixed by changing type to "ReadingListItem".

**Accessibility**:
        - Ran authomated scan using light house and corrected issues.
               Issue1- Buttons do not have an accessible name.
               Issue2 - Background and foreground do not have a sufficient contrast ratio.
  
        -  Button highlighted - Done
        -  Javascript to Anchor Tag - Done
   


