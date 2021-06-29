Code smells:
    Memory leak -> 
            Using async pipe operator in 'book-search.component.html' instead of subscribing in book-search.component.ts file. This way unsubscription of resources is not required  manually in ts file. Added change detection to onpush for faster page load.
           
    FormatDate -> `formatDate()` in `book-search.component.ts` should be replaced with date pipe provided by Angular. Updated 'book-search.component.html' file with date-pipe operator at line#26.

    Test case issue - 
         - Action('addToReadingList') triggers the effects to call API to add book into reading list and at the same time it updates the state by reducer without checking success or failure of backend APIs.Updated store only on success action('confirmedAddToReadingList')

         - Action('removeFromReadingList') triggers the effects to call API to remove book from reading list and at the same time it updates the state by reducer without checking success or failure of backend APIs.
         Updated store only on success action ('confirmedRemoveFromReadingList')
    
    Error handling -  In case if API is respoding with failure, current implementation is not showing any error message to user. 

    Naming convention -  Corrected Naming convention in 'book-search.component.html'.

Improvements:
    Spinner [Implemented] : Added spinner to to give better user experience while API responds. 

    Error message to be displayed [Implemented] -  Enter junk value in search box as ('sfhkafhkadsfafsd'), in this case, application responds with error. Added error message 'No record found' to give better experience to user. 

    
    Mobile UX is not responsive -  Corrected alignment  for mobile view to provide better user experience. Error message for api failure should be displayed.

    

Accessibility:
    Button highlighted - Done
    Javascript to Anchor Tag - ??
    Manual scan using NVDA - ??

