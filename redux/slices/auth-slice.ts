import { createSlice } from "@reduxjs/toolkit";
import { IAuthInfo } from "../../src/interface/auth-interface";

import {
  AuthloginAction,
  AuthlogoutAction,
  AuthTokenAction,
  KeycloakAction,
} from "../actions/auth-action";

const initialState: IAuthInfo = {
  isLogined: false,
  keycloak: null,
  token: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //로그인 시
      .addCase(AuthloginAction.pending, (state, action) => {})
      .addCase(AuthloginAction.fulfilled, (state, action) => {
        state.isLogined = true;
      })
      .addCase(AuthloginAction.rejected, (state, action) => {})
      //keycloak 값 redux 저장
      .addCase(KeycloakAction.pending, (state, action) => {})
      .addCase(KeycloakAction.fulfilled, (state, action) => {
        state.keycloak = action.payload;
        state.isLogined = true;
      })
      .addCase(KeycloakAction.rejected, (state, action) => {})
      //로그아웃
      .addCase(AuthlogoutAction.pending, (state, action) => {})
      .addCase(AuthlogoutAction.fulfilled, (state, action) => {})
      .addCase(AuthlogoutAction.rejected, (state, action) => {})
      .addCase(AuthTokenAction.pending, (state, action) => {})
      .addCase(AuthTokenAction.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(AuthTokenAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});

export default auth.reducer;
