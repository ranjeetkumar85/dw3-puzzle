Code smells:
    Memory leak -> async
            Using async pipe operator in html instead of subscribing in ts file. This way unsubscription of resources is not required  manually since we are using async in html and this will help to 
            Added change detection to onpush for faster page load.
           
    FormatDate -> Done

    Test case issue - reducer test case
    
    Error handling -  Done

Improvements:
    Spinner [Implemented]
    Error message to be displayed [Implemented] -  No record found
    Error message for api failure should be displayed.
    Mobile UX is not responsive -  Done
    Corrected Naming convention. 

Accessibility:
    Button highlighted - Done
    Javascript to Anchor Tag - ??
    Manual scan using NVDA - ??




dateformat -  pipe
async - 
    // Using async pipe operator in html instead of subscribing in ts file
    // No need to unsubscribe manually since we are using async in html
    // Added change detection to onpush for faster page load

Test case issue - reducer test case -  Fixed and added new also  -->  need to check