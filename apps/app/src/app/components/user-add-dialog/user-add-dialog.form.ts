import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserAddFormInstance {
  #form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    avatarUrl: new FormControl<string>(this.getRandomAvatarUrl(), {
      validators: [
        Validators.required,
        Validators.pattern('^(https://)?(?:[A-Za-z0-9-]+.)+[A-Za-z]{2,}(/.+)$'),
      ],
      nonNullable: true,
    }),
  });

  getControls() {
    return this.#form;
  }

  reset() {
    this.#form.reset({
      name: '',
      avatarUrl: this.getRandomAvatarUrl(),
    });
  }

  private getRandomAvatarUrl() {
    const randomId = Math.random().toString(36).slice(-8);
    return `https://api.dicebear.com/9.x/open-peeps/svg?seed=${randomId}`;
  }
}
