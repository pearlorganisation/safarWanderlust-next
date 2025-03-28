import productsReducer from "./features/productsSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const isServer = typeof window === "undefined"; // ✅ Check for server environment

let storage = null;
if (!isServer) {
  storage = require("redux-persist/lib/storage").default; // ✅ Dynamically import storage
}

const persistConfig = {
  key: "persist",
  blacklist: ["cart.createYourOwnPizzaMAX_TOPPINGS"],
  storage: storage || undefined,
};

const rootReducer = combineReducers({
  products: productsReducer,
});

const persistedReducer = isServer
  ? rootReducer // ✅ Use non-persisted reducer on server
  : persistReducer(persistConfig, rootReducer);

const makeConfiguredStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        seriablizableCheck: false,
      }),
  });
};

export const makeStore = () => {
  if (isServer) {
    return makeConfiguredStore();
  }

  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  if (!isServer) {
    store.__persistor = persistStore(store); // ✅ Persistor only runs on client
  }

  return store;
};
