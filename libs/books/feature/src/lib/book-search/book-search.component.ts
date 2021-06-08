import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$: Observable<ReadingListBook[]>;
  private destroyedFormValues$: Subject<void> = new Subject();
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm.get('term').valueChanges
    .pipe(
    // debounce input for 500 milliseconds
    debounceTime(500),
    // only emit if emission is different from previous emission
    distinctUntilChanged(),
    // checking if form is valid
    //filter(() => this.searchForm.valid),
    // unsubscribe
    takeUntil(this.destroyedFormValues$))
    .subscribe((val)=> {
      console.log("val :"+val);
      if (val !== '') {
        this.store.dispatch(searchBooks({term: val}));
      } else{
          this.store.dispatch(clearSearch());
      }
    });
    // Using async pipe operator in html instead of subscribing in ts file
    // No need to unsubscribe manually since we are using async in html
    // Added change detection to onpush for faster page load
    this.books$ = this.store.select(getAllBooks);
   }
  
  ngOnDestroy() {
    this.destroyedFormValues$.next();
    this.destroyedFormValues$.complete();
   }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
  }
 
}
