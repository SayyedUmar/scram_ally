import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AccessTokenSet = '[Auth] Token Set',
  AuthFailure = '[Auth] Failure'
}

export class AccessTokenSet implements Action {
  readonly type = AuthActionTypes.AccessTokenSet;
  constructor(public payload: string) { }
}

export class AuthFailure implements Action {
  readonly type = AuthActionTypes.AuthFailure;
  constructor(public payload: boolean) { }
}

export type AuthActions = AccessTokenSet | AuthFailure;
