// providers/ReduxProvider.tsx
"use client"; // Mark as a Client Component

import { Provider } from "react-redux";
import  {store}  from "@/store/store"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}