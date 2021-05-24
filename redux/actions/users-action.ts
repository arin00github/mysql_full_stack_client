import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../src/interface/user-interface";
import axios from "axios";

interface rejectMessage {
  errorMessage: string;
}

//로그인 액션
export const logInAction = createAsyncThunk<
  IUser,
  any,
  { rejectValue: rejectMessage }
>("user/login", async (data) => {
  console.log("login action data", data);
  return data;
});

export const logOutAction = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    console.log("logout");
  }
);

export const keycloakLogInAction = createAsyncThunk<
  IUser,
  any,
  { rejectValue: rejectMessage }
>("user/keycloak-login", async (data) => {
  console.log("keycloak-login data", data);
  return data;
});

export const getUserLogin = createAsyncThunk<
  IUser,
  any,
  { rejectValue: rejectMessage }
>("user/getlogin", async (data) => {
  const result = await axios("http://localhost:4200/api/auth/login", {
    method: "POST",
    data: {
      name: data,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.data;
});
