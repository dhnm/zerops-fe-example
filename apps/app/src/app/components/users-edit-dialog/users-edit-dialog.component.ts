import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InputSignal,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  UserEntity,
  UserUpdatePayload,
} from '../../core/users-base/users.model';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'z-users-edit-dialog',
  templateUrl: './users-edit-dialog.component.html',
  styleUrls: ['./users-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    UserItemComponent,
  ],
})
export class UsersEditDialogComponent {
  dialogRef =
    inject<MatDialogRef<UsersEditDialogComponent, void>>(MatDialogRef);
  data = inject<{ users: InputSignal<UserEntity[]> }>(MAT_DIALOG_DATA);
  deleteUser = output<number>();
  updateUser = output<{ id: number; payload: UserUpdatePayload }>();
}
