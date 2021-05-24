import { IUser } from "../../src/interface/user-interface";
import users from "./users-slice";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";

export interface State {
  users: IUser;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        users, //userReducer라고 하면 State 인터페이스와 맞지 않아서 return 의 state가 에러가 뜬다.
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
