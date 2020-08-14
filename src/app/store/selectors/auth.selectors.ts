import { createSelector } from '@ngrx/store';
import { IAuthState, IAppState } from '../../provider/business-model/index';

export const selectAuth = (state: IAppState) => state.authState;

export const selectToken = createSelector(
  selectAuth,
  (state: IAuthState) => state.token
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: IAuthState) => state.error
);
