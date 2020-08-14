import { Action } from '@ngrx/store';

export enum AppStateActionTypes {
  ClearAppState = '[AppState] Clear App State'
}

export class ClearAppState implements Action {
  readonly type = AppStateActionTypes.ClearAppState;
  constructor() { }
}
