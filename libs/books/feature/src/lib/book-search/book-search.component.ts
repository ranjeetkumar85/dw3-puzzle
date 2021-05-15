import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  book$: Observable<ReadingListBook[]>;
  private destroyedFormValues$: Subject<boolean> = new Subject();
  private destroyedAPI$: Subject<boolean> = new Subject();

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
    this.searchForm.valueChanges
    .pipe(
    // debounce input for 500 milliseconds
    debounceTime(500),
    // only emit if emission is different from previous emission
    distinctUntilChanged(),
    // checking if form is valid
    filter(() => this.searchForm.valid),
    // unsubscribe
    takeUntil(this.destroyedFormValues$))
    .subscribe((val)=> {
      if (val) {
        console.log('ranjeet:', val);
        this.store.dispatch(searchBooks({ term: val }));
      }
    });

    // Using async pipe operator in html instead of subscribing in ts file
    // added pipe to destroy the subscribtion
    this.book$ = this.store.select(getAllBooks).pipe(takeUntil(this.destroyedAPI$));
    
    // this.store.select(getAllBooks)
    // .pipe(takeUntil(this.destroyedAPI$))
    // .subscribe(books => {
    //   this.books = books;
    // });
  }

  ngOnDestroy() {
    this.destroyedFormValues$.next(true);
    this.destroyedFormValues$.complete();
    this.destroyedAPI$.next(true);
    this.destroyedAPI$.complete();
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
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
