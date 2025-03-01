import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { UserEntity } from '../../core/users-base/users.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { usersActions } from '../../core/users-base/users.state';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

@Component({
  selector: 'z-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule],
})
export class UsersListComponent {
  #store = inject(Store);
  users = input<UserEntity[]>([]);
  readonly dialog = inject(MatDialog);

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
}
