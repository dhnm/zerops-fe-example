import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  UserAddPayload,
  UserAddResponse,
  UserEntity,
  UserUpdatePayload,
  UserUpdateResponse,
} from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  #httpClient = inject(HttpClient);
  #apiUrl = `${process.env.Z_API_URL}/users`;
  #clientId = process.env.Z_CLIENT_ID;

  search$() {
    return this.#httpClient.get<UserEntity[]>(
      `${this.#apiUrl}?clientId=${this.#clientId}`
    );
  }

  add$(data: UserAddPayload) {
    return this.#httpClient.post<UserAddResponse>(this.#apiUrl, {
      ...data,
      clientId: this.#clientId,
    });
  }

  update$(id: number, data: UserUpdatePayload) {
    return this.#httpClient.put<UserUpdateResponse>(`${this.#apiUrl}/${id}`, {
      ...data,
    });
  }

  delete$(id: number) {
    return this.#httpClient.delete<void>(`${this.#apiUrl}/${id}`);
  }
}
