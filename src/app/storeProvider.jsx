"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useState } from "react";
import { Toaster } from "sonner";

export default function StoreProvider({ children }) {
  const [store] = useState(() => makeStore());

  if (!store) return null;

  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}
