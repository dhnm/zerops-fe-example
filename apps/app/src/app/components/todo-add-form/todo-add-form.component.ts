import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TodoAddFormInstance } from './todo-add-form.form';
import { TodoAddPayload } from '../../core/todos-base/todos.model';
import { UsersListComponent } from '../users-list/users-list.component';

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
  formInstance = input.required<TodoAddFormInstance>();
  formControls = computed(() => this.formInstance().getControls());
  add = output<TodoAddPayload>();
}
