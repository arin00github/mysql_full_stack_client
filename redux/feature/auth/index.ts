import { authAction, IAuthValue } from "./auth-slice";

import authReducer from "./auth-slice";

export interface authState {
  auth: IAuthValue;
}

export const { putKeycloakTotal, putUserInfo } = authAction;

export const selectAuth = (state: authState) => state.auth;

export default authReducer;
