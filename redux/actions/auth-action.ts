import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthInfo } from "../../src/interface/auth-interface";

interface rejectMessage {
  errorMessage: string;
}

//로그인 액션
export const AuthloginAction = createAsyncThunk<
  IAuthInfo,
  any,
  { rejectValue: rejectMessage }
>("auth/login", async (data) => {
  console.log("login action data", data);
  return data;
});

export const AuthlogoutAction = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    console.log("logout");
  }
);
export const KeycloakAction = createAsyncThunk<
  IAuthInfo,
  any,
  { rejectValue: rejectMessage }
>("auth/keycloak-login", async (data) => {
  console.log("keycloak-login data", data);
  return data;
});

export const AuthTokenAction = createAsyncThunk<
  IAuthInfo,
  any,
  { rejectValue: rejectMessage }
>("auth/token", async (data) => {
  return data;
});
