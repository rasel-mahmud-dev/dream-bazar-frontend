import {ACTION_TYPES, AuthType, Brand, OrderType} from "store/types/index";
import {UserActionTypes} from "store/types/userActionTypes";

/**
     Login userActionTypes.ts action type
 */
export interface LoginAction {
    type: ACTION_TYPES.LOGIN,
    payload: AuthType

}

/**
 Reset auth loading state
 */
export interface ResetAuthLoadingAction {
    type: ACTION_TYPES.RESET_AUTH_LOADING,
}





export type AuthActionTypes =   LoginAction | ResetAuthLoadingAction | UserActionTypes