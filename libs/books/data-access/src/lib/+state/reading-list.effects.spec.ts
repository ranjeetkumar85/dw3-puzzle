import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  SharedTestingModule,
  createBook,
  createReadingListItem,
} from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

const MatSnackBarStub = {
  open: jest.fn(() => {
    return {
      onAction: () => {
        return of([]);
      },
    };
  }),
};

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        {
          provide: MatSnackBar,
          useValue: MatSnackBarStub
        },
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });
  describe('undoAddtoReadingList$', () => {
    it('should trigger removeFromReadingList action on undo', (done) => {
      actions = new ReplaySubject();
      const book = createBook('Angular');
      actions.next(ReadingListActions.confirmedAddToReadingList({ book, openSnackbar: true }));

      effects.undoAddtoReadingList$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.removeFromReadingList({
            item: { ...book, bookId: book.id },
            openSnackbar: false
          })
        );
        done();
      });
      expect(MatSnackBarStub.open).toHaveBeenCalledTimes(1);
      MatSnackBarStub.open.mockClear();
    });
  });

  describe('undoRemoveFromReadingList$', () => {
    it('should trigger addToReadingList action on undo', (done) => {
      actions = new ReplaySubject();
      const readingListItem = createReadingListItem('Angular');
      actions.next(
        ReadingListActions.confirmedRemoveFromReadingList({
          item: readingListItem,
          openSnackbar: true
        })
      );

      effects.undoRemoveFromReadingList$.subscribe((action) => {
        expect(action).toEqual(
          ReadingListActions.addToReadingList({
            book: { ...action.book },
            openSnackbar: false
          })
        );
        done();
      });
      expect(MatSnackBarStub.open).toHaveBeenCalledTimes(1);
      MatSnackBarStub.open.mockClear();
    });
  });
});