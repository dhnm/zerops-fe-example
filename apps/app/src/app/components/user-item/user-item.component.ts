import { Component, effect, inject, input, output } from '@angular/core';
import { ChangeDetectionStrategy, computed } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  UserEntity,
  UserUpdatePayload,
} from '../../core/users-base/users.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'z-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class UserItemComponent {
  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    avatarUrl: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.pattern('^(https://)?(?:[A-Za-z0-9-]+.)+[A-Za-z]{2,}(/.+)$'),
      ],
      nonNullable: true,
    }),
  });

  data = input.required<UserEntity>();
  delete = output<void>();
  update = output<UserUpdatePayload>();

  constructor() {
    effect(() => {
      const value = this.data();
      if (!value) return;

      this.form.setValue({
        name: value.name,
        avatarUrl: value.avatarUrl,
      });
    });
  }

  reset() {
    this.form.reset();
  }
}
