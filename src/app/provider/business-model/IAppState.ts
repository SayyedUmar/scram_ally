import { IAuthState, IUserDetailsState } from './index';
export interface IAppState {
    authState: IAuthState;
    userDetailsState: IUserDetailsState;
  }