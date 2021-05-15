2) 
Improvement
    ReadingListActions.addToReadingList -> confirmedAddToReadingList
    - Updating store on action(addToReadingList) which also trigger the api by ngrx effect but we are not waiting for api response. 
     So the changes displays on the UI(Either api fails or succeed). So updated store only if there is success response from api.

    ReadingListActions.removeFromReadingList--> confirmedRemoveFromReadingList
        - Updating store on action(addToReadingList) which also trigger the api by ngrx effect() but we are not waiting for api response. 
     So the changes displays on the UI(Either api fails or succeed). So updated store only if there is success response from api.


3) Accessibility - 


4)

5)
Test cases were failing for 
        \libs\books\data-access\src\lib\+state\reading-list.reducer.spec.ts

6) Typeahead search

7) unsubscribe observable