import { Action } from '@ngrx/store';
import { UserDetails } from '../models/user-details.model';

export enum UserDetailsActionTypes {
    SetUserDetails = '[UserDetails] Set User Details',
    GetUserDetails = '[UserDetails] Get User Details'
}

export class SetUserDetails implements Action {
    readonly type = UserDetailsActionTypes.SetUserDetails;
    constructor(public payload: UserDetails) { }
}

export class GetUserDetails implements Action {
    readonly type = UserDetailsActionTypes.GetUserDetails;
    constructor(public payload) { }
}

export type UserDetailsActions = SetUserDetails | GetUserDetails;
