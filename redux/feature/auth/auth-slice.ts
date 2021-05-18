import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeycloakInstance } from "keycloak-js";

export interface IUserProps {
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface IAuthValue {
  keycloak: KeycloakInstance;
  user: IUserProps;
}

export const KeyinitialState: IAuthValue = {
  keycloak: null,
  user: {
    name: "",
    email: "",
    role: "",
    active: false,
    createdAt: null,
    updateAt: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: KeyinitialState,
  reducers: {
    putKeycloakTotal: (state, action: PayloadAction<any>) => ({
      ...state,
      keycloak: action.payload,
    }),
    putUserInfo: (state, action: PayloadAction<any>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
