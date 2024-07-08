import type { Session } from "next-auth";
import type { ReactNode } from "react";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export interface CustomSession extends Session {
  user?: {
    id?: string;
    email?: string | null;
    access_token?: string | null;
  };
}
