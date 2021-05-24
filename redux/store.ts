import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from "@reduxjs/toolkit";

import { createWrapper, MakeStore } from "next-redux-wrapper";

import slices from "./slices";

const devMode = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: slices,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false, // 직렬화 미들웨어 체크
    }),
  ],
  devTools: devMode,
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore = (context) => setupStore(context);

const wrapper = createWrapper(makeStore, { debug: devMode });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default wrapper;
