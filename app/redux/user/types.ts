export interface User {
  email: string;
  password: string;
  email_verified: boolean;
  city?: string;
  nit?: string;
  name?: string;
}

export interface UserState {
  currentUser?: User;
}

export interface NetworkError {
  message: string;
  code: string;
}

export const SET_USER = 'SET_USER';

interface SerUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type UserActionTypes = SerUserAction;