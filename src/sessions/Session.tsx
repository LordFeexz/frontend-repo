"use client";

import type { ChildrenProps } from "@/interfaces";
import { SessionProvider } from "next-auth/react";

export default function AppSessionProvider({ children }: ChildrenProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
