"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";
import { Toaster } from "sonner";

export default function StoreProvider({ children }) {
  const [store] = useState(() => makeStore());

  if (!store) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <Toaster />
        {children}
      </PersistGate>
    </Provider>
  );
}
