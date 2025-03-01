import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserAddFormInstance {
  #defaultValues = {
    name: '',
    avatarUrl: '',
  };
  #form = new FormGroup({
    name: new FormControl<string>(this.#defaultValues.name, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    avatarUrl: new FormControl<string>(this.#defaultValues.avatarUrl, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  getControls() {
    return this.#form;
  }

  reset() {
    this.#form.reset(this.#defaultValues);
  }
}
