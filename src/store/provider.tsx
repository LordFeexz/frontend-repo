"use client";

import type { ChildrenProps } from "@/interfaces";
import { Provider } from "react-redux";
import store from ".";

export default function StoreProvider({ children }: ChildrenProps) {
  return <Provider store={store}>{children}</Provider>;
}
