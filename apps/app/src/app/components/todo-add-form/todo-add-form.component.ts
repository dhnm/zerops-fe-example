import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TodoAddFormInstance } from './todo-add-form.form';
import { TodoAddPayload } from '../../core/todos-base/todos.model';
import { UsersListComponent } from '../users-list/users-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { usersEntity } from '../../core/users-base/users.state';
import { first, map } from 'rxjs';

@Component({
  selector: 'z-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    UsersListComponent,
  ],
})
export class TodoAddFormComponent {
  #usersEntity = usersEntity();
  formInstance = input.required<TodoAddFormInstance>();
  formControls = computed(() => this.formInstance().getControls());
  add = output<TodoAddPayload>();

  // data
  users = toSignal(this.#usersEntity.users$, {
    initialValue: [],
  });
  firstUserId = toSignal(
    this.#usersEntity.users$.pipe(
      map((users) => (users.length ? users[0].id : 0))
    ),
    {
      initialValue: 0,
    }
  );
  selectedUserId = signal<number>(0);
  userId = computed(() => this.selectedUserId() || this.firstUserId());
  placeholder = computed(() => {
    const user = this.users().find((user) => user.id === this.userId());
    return user ? `Popis úkolu pro ${user.name}...` : 'Popis úkolu...';
  });

  constructor() {
    effect(() => {
      this.formControls()?.get('userId')?.setValue(this.userId());
    });
  }
}
