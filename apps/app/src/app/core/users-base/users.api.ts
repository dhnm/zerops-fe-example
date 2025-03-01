import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserAddPayload, UserAddResponse } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  #httpClient = inject(HttpClient);
  #apiUrl = `${process.env.Z_API_URL}/users`;
  #clientId = process.env.Z_CLIENT_ID;

  add$(data: UserAddPayload) {
    return this.#httpClient.post<UserAddResponse>(this.#apiUrl, {
      ...data,
      clientId: this.#clientId,
    });
  }
}
