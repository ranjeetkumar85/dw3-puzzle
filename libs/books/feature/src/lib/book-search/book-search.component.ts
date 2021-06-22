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
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);
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
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroyedFormValues$))
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.store.dispatch(searchBooks({ term: searchTerm }));
        } else {
          this.store.dispatch(clearSearch());
        }
      });
  }
  
  ngOnDestroy(): void {
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
