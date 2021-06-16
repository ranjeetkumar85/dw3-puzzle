import { BOOKS } from './../constants/book-search-constants';
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  discardPeriodicTasks
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { provideMockStore } from '@ngrx/store/testing';
import { clearSearch, getAllBooks, searchBooks } from '@tmo/books/data-access';
import { Store } from '@ngrx/store';
describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule
      ],
      providers: [
        Store,
        provideMockStore({
          initialState: {
            books: {
              entities: []
            }
          },
          selectors: [{
            selector: getAllBooks,
            value: []
          }]
        }),
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn(component.searchForm, 'valueChanges');
      spyOn(store, 'dispatch');
      spyOn(store, 'select').and.returnValue(BOOKS);
    });

    it('It should call searchBooks() when we have value for search term and actual time spent after entering search term is equal to 500ms', fakeAsync(() => {
      component.ngOnInit();
      component.searchForm.controls.term.setValue('Angular');
      tick(500);
      component.searchForm.valueChanges.subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(searchBooks({ term: 'Angular' }))
      });
    }));

    it('It should populate the array of Book object', fakeAsync(() => {
      component.ngOnInit();
      component.searchForm.controls.term.setValue('');
      tick(400);
      component.searchForm.valueChanges.subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(clearSearch())
      });
      expect(component.books$).toEqual(BOOKS);
      discardPeriodicTasks();
    }));
  });
});