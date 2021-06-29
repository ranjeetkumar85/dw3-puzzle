Code smells:
    Memory leak -> async
    FormatDate
    Test case issue - reducer test case
    Error handling

Improvements:
    Spinner [Implemented]
    Error message to be displayed [Implemented] -  No record found
    Error message for api failure should be displayed ??
    Mobile UX is not responsive

Accessibility:
    Button highlighted
    Javascript to Anchor Tag
    Manual scan using NVDA




Corrected Naming convention. 


dateformat -  pipe
async - 
    // Using async pipe operator in html instead of subscribing in ts file
    // No need to unsubscribe manually since we are using async in html
    // Added change detection to onpush for faster page load

Test case issue - reducer test case -  Fixed and added new also  -->  need to check