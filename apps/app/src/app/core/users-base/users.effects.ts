import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { usersActions } from './users.state';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UsersApi } from './users.api';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersEffects implements OnInitEffects {
  // deps
  #actions$ = inject(Actions);
  #api = inject(UsersApi);
  #snack = inject(MatSnackBar);

  // effects
  searchOnInit$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(usersActions.init),
      switchMap(() =>
        this.#api.search$().pipe(
          map((res) => usersActions.searchSuccess({ res })),
          catchError(() => of(usersActions.searchFail()))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(usersActions.add),
      switchMap(({ payload }) =>
        this.#api.add$(payload).pipe(
          map((res) => usersActions.addSuccess({ res })),
          catchError(() => of(usersActions.addFail()))
        )
      )
    )
  );

  onAddSuccessShowSnackbar$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(usersActions.addSuccess),
        tap(() => this.#openSnack('Uživatel přidán'))
      ),
    { dispatch: false }
  );

  update$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(usersActions.update),
      switchMap(({ id, payload }) =>
        this.#api.update$(id, payload).pipe(
          map((res) => usersActions.updateSuccess({ res })),
          catchError(() => of(usersActions.updateFail()))
        )
      )
    )
  );

  onUpdateSuccessShowSnackbar$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(usersActions.updateSuccess),
        tap(() => this.#openSnack('Uživatel upraven'))
      ),
    { dispatch: false }
  );

  #openSnack(message: string) {
    this.#snack.open(message, 'Zavřít', {
      horizontalPosition: 'start',
    });
  }

  ngrxOnInitEffects(): Action {
    return usersActions.init();
  }
}
