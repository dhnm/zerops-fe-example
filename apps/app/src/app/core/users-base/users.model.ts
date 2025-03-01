export const FEATURE_NAME = 'users';

export interface UsersState {
  data: UserEntity[];
}

export interface UserEntity {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface UserAddPayload {
  name: string;
  avatarUrl: string;
}

export interface UserAddResponse extends UserEntity {}
