import {
  createStore,
  AnyAction,
  Store,
  Action,
  applyMiddleware,
  Middleware,
  StoreEnhancer,
} from "redux";
import { combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, Context, HYDRATE, MakeStore } from "next-redux-wrapper";

import rootReducer, { RootState } from "./slices/index";
import thunkMiddleware from "redux-thunk";
import users from "./slices/users-slice";
import auth from "./slices/auth-slice";

const bindMiddleWare = (middleware: Middleware[]): StoreEnhancer => {
  // Middleware, StoreEnhancer등을 정의해 주지 않으면 스프레드문법을 쓸 수 없다고 나온다.
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  } else {
    return applyMiddleware(...middleware);
  }
};

const makeStore = ({ isServer }: any) => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleWare([thunkMiddleware]));
  } else {
    const {
      persistStore,
      persistReducer,
      autoRehydrate,
    } = require("redux-persist");
    const storage = require("redux-persist/lib/storage/session").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: [users, auth],
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: any = createStore(
      // any로 값을 주어서 type의 제한을 푼다
      persistedReducer,
      {},
      bindMiddleWare([thunkMiddleware])
    );
    store.__persistor = persistStore(store);

    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
