import { createSelector } from '@ngrx/store';
import { IAppState, IUserDetailsState } from 'src/app/provider/business-model/index';

export const selectUser = (state: IAppState) => state.userDetailsState;

export const selectUserDetails = createSelector(
  selectUser,
  (state: IUserDetailsState) => state.userDetails
);
