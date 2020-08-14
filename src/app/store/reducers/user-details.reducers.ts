import * as userDetailsAction from '../actions/user-details.actions';
import {IUserDetailsState} from '../../provider/business-model/index';


export const initialUserDetailsState: IUserDetailsState = {
    userDetails: {
        name: '',
        nickname: '',
        email: '',
        emailVerified: false,
        picture: ''
    }
};

export function userDetailsReducer(
    state = initialUserDetailsState,
    action: userDetailsAction.UserDetailsActions
): IUserDetailsState {

    switch (action.type) {
        case userDetailsAction.UserDetailsActionTypes.SetUserDetails: {
            return {
                ...state,
                userDetails: {
                    name: action.payload.name,
                    nickname: action.payload.nickname,
                    email: action.payload.email,
                    emailVerified: action.payload.emailVerified,
                    picture: action.payload.picture
                }
            };
        }
        case userDetailsAction.UserDetailsActionTypes.GetUserDetails: {
            return {
                ...state,
                userDetails: {
                    ...state.userDetails
                }
            };
        }
        default: {
            return state;
        }
    }

}
