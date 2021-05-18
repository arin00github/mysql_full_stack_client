import { createStore, AnyAction, Store, Action } from "redux";
import { combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import countReducer from "./feature/count";
import authReducer from "./feature/auth";

export interface State {
  server: any;
  client: any;
}

const combinedReducer = combineReducers({
  count: countReducer,
  auth: authReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// const reducer = (state: State = {tick:'init'}, action: AnyAction) => {
//   switch(action.type){
//     case HYDRATE:
//       return {
//         ...state,
//         server: {
//           ...state.server,
//           ...action.payload.server
//         }
//       }
//     case 'SERVER_ACTION':
//       return {
//         ...state,
//         server: {
//           ...state.server,
//           tick: action.payload
//         }
//       };
//     case 'CLIENT_ACTION':
//      return {
//        ...state,
//        client: {
//          ...state.client,
//          tick: action.payload
//        }
//      }
//     default:
//       return state;
//   }
// }

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
