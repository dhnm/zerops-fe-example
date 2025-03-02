import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserAddFormInstance } from './user-add-dialog.form';
import { UserAddPayload } from '../../core/users-base/users.model';

@Component({
  selector: 'z-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class UserAddDialogComponent {
  formInstance = inject(UserAddFormInstance);
  formControls = computed(() => this.formInstance.getControls());
  dialogRef =
    inject<MatDialogRef<UserAddDialogComponent, UserAddPayload>>(MatDialogRef);

  constructor() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.formInstance.reset();
    });
  }
}
