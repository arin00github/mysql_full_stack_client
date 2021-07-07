import { createSlice } from "@reduxjs/toolkit";
import { dataTool } from "echarts";
import axios from "axios";
import { AppThunk } from "../store";
import { ICurrentData } from "../../src/interface/chart-interface";

const initialState: ICurrentData = {
  current: null,
  title: "",
};

export const chart = createSlice({
  name: "chart",
  initialState,
  reducers: {
    keepCurrent: (state, action) => {
      return {
        ...state,
        current: action.payload.current,
        title: action.payload.title,
      };
    },
  },
});

export const { keepCurrent } = chart.actions;

//클라이언트 부분에서 실행하는..
export const fetchCurrentData =
  (arg: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(keepCurrent(arg));
      //console.log("fetchUser", result);
    } catch (err) {
      console.log(err);
    }
  };

export default chart.reducer;
