import { Book } from './../../../../../shared/models/src/models';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from 'libs/shared/models/src/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration = 3;
   
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(item);
  }

  openSnackBar(item: ReadingListItem ) {
    let book = <Book>{};
    this.createBookfromItem(item, book);
    console.log("book-id "+book.id);
    this._snackBar.open('Book is removed from List.','UNDO', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:this.duration * 1000,
    }).onAction().subscribe(value =>  this.store.dispatch(addToReadingList({ book })) );
  }

  createBookfromItem(item: ReadingListItem, book: Book){
    console.log("createBookfromItem : "+item.bookId)
    book.id = item.bookId;
    book.authors = item.authors;
    book.description =  item.description;
    book.coverUrl =  item.coverUrl;
    book.publishedDate = item.publishedDate;
    book.publisher =  item.publisher;
    console.log("createBookfromItem : "+book.id)
    
  }
}
