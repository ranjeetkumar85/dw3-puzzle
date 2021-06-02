import { removeFromReadingList } from './../../../../data-access/src/lib/+state/reading-list.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { debounceTime } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private duration =  3;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm.get('term').valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log("instant : "+this.searchForm.value.term);
      this.searchBooks();
    });
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  public addBookToReadingList(book: Book) {
     this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar( book );
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

  private openSnackBar(book: Book ) {
    let item: ReadingListItem =   this.createBookFromItem( book);
    this._snackBar.open('Book is added to List.','UNDO', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration*1000,
    }).onAction().subscribe(value => this.store.dispatch(removeFromReadingList({ item })));
  }

  private createBookFromItem( book: Book) : ReadingListItem{
    let item = <ReadingListItem>{};
    item.bookId = book.id;
    item.authors = book.authors;
    item.description =  book.description;
    item.coverUrl =  book.coverUrl;
    item.publishedDate = book.publishedDate;
    item.publisher =  book.publisher;
    return item;
  }
}
