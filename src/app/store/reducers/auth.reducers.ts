import * as AuthAction from '../actions/auth.actions';
import { IAuthState } from '../../provider/business-model/index';

export const initialAuthState: IAuthState = {
  token: '',
  error: false
};

export function authReducers(
  state = initialAuthState,
  action: AuthAction.AuthActions
): IAuthState {
  switch (action.type) {
    case AuthAction.AuthActionTypes.AccessTokenSet: {
      return {
        ...state,
        token: action.payload
      };
    }
    case AuthAction.AuthActionTypes.AuthFailure: {
      return {
        ...state,
        error: true
      };
    }
    default: {
      return state;
    }
  }
}
