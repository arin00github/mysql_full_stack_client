import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../src/interface/user-interface";
import {
  logInAction,
  keycloakLogInAction,
  logOutAction,
} from "../actions/users-action";

const initialState: IUser = {
  isLoggedIn: false,
  user: null,
  keycloakInfo: null,
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logInAction.pending, (state, action) => {})
      .addCase(logInAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logInAction.rejected, (state, action) => {})
      .addCase(keycloakLogInAction.pending, (state, action) => {})
      .addCase(keycloakLogInAction.fulfilled, (state, action) => {
        state.keycloakInfo = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(keycloakLogInAction.rejected, (state, action) => {})
      .addCase(logOutAction.pending, (state, action) => {})
      .addCase(logOutAction.fulfilled, (state, action) => {})
      .addCase(logOutAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});

export default users.reducer;
