import { createSlice } from "@reduxjs/toolkit";
import { IUserCollect, IUserProfile } from "../../src/interface/user-interface";
import { getUserAction, userListAction } from "../actions/users-action";

const initialState: IUserCollect = {
  userInfo: {
    name: "",
    email: "",
    role: "",
    active: false,
    createdAt: null,
    updateAt: null,
  },
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserAction.pending, (state, action) => {})
      .addCase(getUserAction.fulfilled, (state, action) => {
        console.log("action/getUserAction", action);
        state.userInfo = action.payload;
      })
      .addCase(getUserAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});

export default users.reducer;
