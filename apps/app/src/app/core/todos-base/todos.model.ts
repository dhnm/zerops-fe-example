import { UserEntity } from '../users-base/users.model';

export const FEATURE_NAME = 'todos';

export interface TodosState {
  data: TodoEntity[];
}

export interface TodoEntity {
  id: number;
  text: string;
  clientId: string;
  completed: boolean;
  userId: number;
  user: UserEntity;
}

export interface TodoAddPayload {
  text: string;
  completed: boolean;
  userId: number;
}

export interface TodoAddResponse extends TodoEntity {}

export interface TodoUpdatePayload {
  text: string;
  completed: boolean;
  userId: number;
}

export interface TodoUpdateResponse extends TodoEntity {}
