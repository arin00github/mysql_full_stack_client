import { createAsyncThunk } from "@reduxjs/toolkit";

interface rejectMessage {
  errorMessage: string;
}

//redux에 임시 저장, 현재 데이터로 선택
export const KeepCurrentData = createAsyncThunk<
  any,
  { rejectValue: rejectMessage }
>("chart/keep", async (data) => {
  //console.log("login action data", data);
  return data;
});
