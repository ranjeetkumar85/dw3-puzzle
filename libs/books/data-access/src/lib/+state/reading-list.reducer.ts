import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  // Action(addToReadingList) triggers the effects to call API to add book into reading list 
  // And at the same time it updates the state by reducer without checking success or failure of backend APIs 
  // updating store only on success action(confirmedAddToReadingList)
  on(ReadingListActions.confirmedAddToReadingList, (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  
  // Action(removeFromReadingList) triggers the effects to call API to remove book from reading list 
  // And at the same time it updates the state by reducer without checking success or failure of backend APIs 
  // updating store only on success action(confirmedRemoveFromReadingList)
  on(ReadingListActions.confirmedRemoveFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
