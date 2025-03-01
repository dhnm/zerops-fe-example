import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
  select,
  Store,
} from '@ngrx/store';
import {
  FEATURE_NAME,
  UserAddPayload,
  UserAddResponse,
  UserEntity,
  UsersState,
} from './users.model';
import { inject } from '@angular/core';

const initialState: UsersState = {
  data: [],
};

export const usersActions = createActionGroup({
  source: FEATURE_NAME,
  events: {
    init: emptyProps(),
    add: props<{ payload: UserAddPayload }>(),
    'add success': props<{
      res: UserAddResponse;
    }>(),
    'add fail': emptyProps(),

    search: props<{ clientId: string }>(),
    'search success': props<{ res: UserEntity[] }>(),
    'search fail': emptyProps(),
  },
});

export const usersState = createFeature({
  name: FEATURE_NAME,
  reducer: createReducer(
    initialState,
    on(usersActions.searchSuccess, (state, { res }) => ({
      ...state,
      data: res,
    })),
    on(usersActions.addSuccess, (state, { res }) => ({
      ...state,
      data: [res, ...state.data],
    }))
  ),
});

export function usersEntity() {
  const store = inject(Store);
  return {
    users$: store.pipe(select(usersState.selectData)),
  };
}
