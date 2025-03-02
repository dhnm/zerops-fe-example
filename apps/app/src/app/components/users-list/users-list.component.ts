import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { UsersEditDialogComponent } from '../users-edit-dialog/users-edit-dialog.component';
import { usersActions } from '../../core/users-base/users.state';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { UserEntity } from '../../core/users-base/users.model';

@Component({
  selector: 'z-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatFabButton, MatIcon],
})
export class UsersListComponent {
  // deps
  #store = inject(Store);
  readonly dialog = inject(MatDialog);
  users = input.required<UserEntity[]>();
  userId = input.required<number>();
  selectUserId = output<number>();

  // methods
  selectUser(id: number) {
    this.selectUserId.emit(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      width: '300px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((payload) => !!payload),
        map((payload) => usersActions.add({ payload }))
      )
      .subscribe(this.#store);
  }

  openEditUsersDialog(): void {
    const dialogRef = this.dialog.open(UsersEditDialogComponent, {
      width: '450px',
      data: { users: this.users },
    });

    dialogRef.componentInstance.updateUser.subscribe((payload) => {
      this.#store.dispatch(usersActions.update(payload));
    });

    dialogRef.componentInstance.deleteUser.subscribe((payload) => {
      this.#store.dispatch(usersActions.delete({ id: payload }));
    });
  }
}
