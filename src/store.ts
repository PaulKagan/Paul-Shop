import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import usersReducer from "./Slices/usersSlice";
import cartReducer from "./Slices/cartSlice";
import storage from "redux-persist/lib/storage";
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


export type RootState = {
  user: ReturnType<typeof userReducer>;
  users: ReturnType<typeof usersReducer>;
  cart: ReturnType<typeof cartReducer>;
};

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  user: userReducer,
  users: usersReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store;