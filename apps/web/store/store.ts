/* 
  psy21d 
  Apche 2.0 licensed
*/
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionsReducer from "./sessionsSlice";
import preferencesReducer from "./preferencesSlice";
import audioSettingsReducer from "./audioSettingsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  sessions: sessionsReducer,
  preferences: preferencesReducer,
  audioSettings: audioSettingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
