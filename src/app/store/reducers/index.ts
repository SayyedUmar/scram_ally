import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AppStateActionTypes } from '../actions';
import { authReducers } from './auth.reducers';
import { userDetailsReducer } from './user-details.reducers';
import { IAppState } from '../../provider/business-model/index';

export const reducers: ActionReducerMap<IAppState> = {
  authState: authReducers,
  userDetailsState: userDetailsReducer
};

export function clearAppState(
  reducer: ActionReducer<IAppState>
): ActionReducer<IAppState> {
  return (state: IAppState, action: Action): IAppState => {
    if (action.type === AppStateActionTypes.ClearAppState) {
      state = undefined;
    }
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
