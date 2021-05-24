import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeycloakInstance } from "keycloak-js";
import { HYDRATE } from "next-redux-wrapper";

const hydrate = createAction(HYDRATE);
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
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action: PayloadAction<any>) => {
      console.log("addCase_hydrate", action.payload);
      console.log("hydrate_state", state);
      return {
        ...state,
        ...(action.payload as any)[authSlice.name],
      };
    });
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
