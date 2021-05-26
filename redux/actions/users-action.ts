import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommonService } from "../../pages/api/services/common-service";
import { IUserCollect, IUserProfile } from "../../src/interface/user-interface";

interface rejectMessage {
  errorMessage: string;
}

//createAsync 와 createSlice의 extraReducer는 서로 연관이 있는 것 같다.

// export const getUserAction = createAsyncThunk<
//   IUserCollect,
//   any,
//   { rejectValue: rejectMessage }
// >("users/getProfile", async (data: string) => {
//   const result = await axios("http://localhost:4200/api/users/profile", {
//     method: "POST",
//     data: {
//       name: data,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log("getUserAction", result.data);
//   return result.data;
// });

// export const userListAction = createAsyncThunk<
//   IUserProfile[],
//   any,
//   { rejectValue: rejectMessage }
// >("users/getList", async (data) => {
//   const result = await CommonService.instance.getUserList();
//   return result.data;
// });
