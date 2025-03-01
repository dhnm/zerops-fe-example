import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class TodoAddFormInstance {
  #defaultValues = {
    text: '',
    completed: false,
    userId: 0,
  };
  #form = new FormGroup({
    text: new FormControl<string>(this.#defaultValues.text, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    completed: new FormControl<boolean>(this.#defaultValues.completed, {
      nonNullable: true,
    }),
    userId: new FormControl<number>(this.#defaultValues.userId, {
      nonNullable: true,
      validators: [Validators.min(1)],
    }),
  });

  getControls() {
    return this.#form;
  }

  reset() {
    this.#form.reset(this.#defaultValues);
  }
}
