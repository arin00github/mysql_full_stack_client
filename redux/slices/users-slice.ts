import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserCollect, IUserProfile } from "../../src/interface/user-interface";
import { AppThunk } from "../store";

const initialState: IUserCollect = {
  userInfo: {
    name: "",
    email: "",
    role: "",
    active: false,
    createdAt: null,
    updateAt: null,
  },
  userArray: [],
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserAction: (state, action) => {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
  },
  //   extraReducers: (builder) =>
  //     builder
  //       .addCase(getUserAction.pending, (state, action) => {})
  //       .addCase(getUserAction.fulfilled, (state, action) => {
  //         console.log("action/getUserAction", action);
  //         state.userInfo = action.payload;
  //       })
  //       .addCase(getUserAction.rejected, (state, action) => {})
  //       .addDefaultCase(() => {}),
});

export const { getUserAction } = users.actions;

export const fetchUser =
  (arg: any): AppThunk =>
  async (dispatch) => {
    try {
      const result = await axios("http://localhost:4200/api/users/profile", {
        method: "POST",
        data: {
          name: arg,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(getUserAction(result.data));
      //console.log("fetchUser", result);
    } catch (err) {
      console.log(err);
    }
  };

export default users.reducer;
