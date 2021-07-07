import { IUserCollect } from "../../src/interface/user-interface";
import users from "./users-slice";
import auth from "./auth-slice";
import chart from "./chart-slice";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { IAuthInfo } from "../../src/interface/auth-interface";
import { ICurrentData } from "../../src/interface/chart-interface";

export interface State {
  users: IUserCollect;
  auth: IAuthInfo;
  chart: ICurrentData;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        users, //userReducer라고 하면 State 인터페이스와 맞지 않아서 return 의 state가 에러가 뜬다.
        auth,
        chart,
      });
      return combineReducer(state, action);
    }
  }
};
//이 유형은rootReducer에서 반환되는 모든 유형입니다
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
