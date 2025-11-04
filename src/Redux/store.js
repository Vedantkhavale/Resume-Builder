

// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// ✅ Combine reducers (good for scalability)
const rootReducer = combineReducers({
  form: formReducer,
});

// ✅ Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ✅ Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Export persistor for <PersistGate />
export const persistor = persistStore(store);
