import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  switchMap,
  exhaustMap,
  map,
  filter
} from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

const UNDO = 'Undo';
const DURATION = 2000;

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book, openSnackbar }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() =>
            ReadingListActions.confirmedAddToReadingList({
              book: book,
              openSnackbar: openSnackbar
            })
          ),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item, openSnackbar }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({
              item: item,
              openSnackbar: openSnackbar
            })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  undoAddtoReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      filter(({openSnackbar}) => openSnackbar),
      switchMap(({ book }) => {
        return this.openSnackbar(
          `Book ${book.title} is added to reading list`,
          UNDO
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.removeFromReadingList({
                item: { ...book, bookId: book.id },
                openSnackbar: false
              })
            )
          );
      })
    )
  );

  undoRemoveFromReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      filter(({openSnackbar}) => openSnackbar),
      switchMap(({ item }) => {
        return this.openSnackbar(
          `Book ${item.title} is removed from reading list`,
          UNDO
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.addToReadingList({
                book: { id: item.bookId, ...item },
                openSnackbar: false
              })
            )
          );
      })
    )
  );

  openSnackbar(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: DURATION
    });
  }

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}
}
